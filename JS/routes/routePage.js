const express = require("express");
const router = express.Router();

const controllerDocument = require("../controller/controllerDocument");
const categories = require("../data/dataCategory");

// TODO Pages d'accueil
router.get("/", (req, res) => {
    res.render("pages/index", { title: "Accueil" });
});

// TODO Page de la bibliothéque
router.get("/bibliotheque", controllerDocument.index);
router.get("/ajouter-document", (req, res) => {
    res.render("pages/add-doc", { title: "Ajouter un document", categories });
});
router.post("/add-document", controllerDocument.create);
router.delete("/delete-document/:id", controllerDocument.destroy);
router.get("/modifier-document/:id", controllerDocument.edit);
router.put("/modifier-document/:id", controllerDocument.update);

module.exports = router;
