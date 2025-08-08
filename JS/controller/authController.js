const path = require("path");
require("dotenv").config();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../model/Users");
const SECRET_KEY = process.env.SECRET_KEY || "dev-secret-change-me";

function showRegister(req, res) {
  res.render("pages/register", {
    title: "Inscription",
    error: null,
    values: { username: "", email: "" },
  });
}

async function register(req, res) {
  const { username, email, password } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(409).render("pages/register", {
        title: "Inscription",
        error: "Nom d'utilisateur déjà pris",
        values: { username, email },
      });
    }
    const hashed = await argon2.hash(password, { type: argon2.argon2id });
    await new User({ username, email, password: hashed }).save();
    return res.redirect("/login?registered=1");
  } catch (e) {
    console.error(e);
    return res.status(500).render("pages/register", {
      title: "Inscription",
      error: "Erreur lors de l'enregistrement",
      values: { username, email },
    });
  }
}

function showLogin(req, res) {
  res.render("pages/login", {
    title: "Connexion",
    error: null,
    justRegistered: req.query.registered === "1",
  });
}

async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).render("pages/login", {
      title: "Connexion",
      error: "Nom d'utilisateur et mot de passe requis",
      justRegistered: false,
    });
  }
  try {
    const user = await User.findOne({ username });
    const ok = user && (await argon2.verify(user.password, password));
    if (!ok) {
      return res.status(401).render("pages/login", {
        title: "Connexion",
        error: "Identifiants incorrects",
        justRegistered: false,
      });
    }
    const token = jwt.sign({ username: user.username }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      expires: new Date(Date.now() + 3600000),
    });
    return res.redirect("/bibliotheque");
  } catch (e) {
    console.error(e);
    return res.status(500).render("pages/login", {
      title: "Connexion",
      error: "Erreur lors de la connexion",
      justRegistered: false,
    });
  }
}

function profile(req, res) {
  res.render("pages/profile", {
    title: "profile",
    username: req.user.username,
  });
}

function logout(req, res) {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    expires: new Date(0),
  });
  res.redirect("/login");
}

module.exports = {
  showRegister,
  register,
  showLogin,
  login,
  profile,
  logout,
};
