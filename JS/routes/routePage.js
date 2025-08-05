const express = require("express");
const router = express.Router();

const controllerDocument = require("../controller/controllerDocument");

// TODO Pages d'accueil
router.get("/", (req, res) => {
    res.render("pages/index", { title: "Accueil" });
});

// TODO Page de la bibliothéque
router.get("/bibliotheque", controllerDocument.index);

router.post("/ajouter-document", controllerDocument.create);

module.exports = router;
