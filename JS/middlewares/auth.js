const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const SECRET_KEY = process.env.SECRET_KEY || "dev-secret-change-me";
  const token = req.cookies && req.cookies.token;
  if (!token) return res.redirect("/login");

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    res.locals.currentUser = decoded.username;
    next();
  } catch (e) {
    return res.redirect("/login");
  }
}

module.exports = requireAuth;
