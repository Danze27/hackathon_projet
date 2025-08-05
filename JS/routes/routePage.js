const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("pages/index", { title: "Accueil" });
});

router.get("/bibliotheque", (req, res) => {
    res.render("pages/bibliotheque", { title: "Bibliothèque" });
});