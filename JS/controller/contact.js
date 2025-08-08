const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// GET classique si on tape /contact dans le navigateur
router.get("/", (req, res) => {
  res.render("pages/contact", { title: "Contact", formData: {} });
});

// POST via AJAX
router.post(
  "/",
  [
    body("nom").trim().notEmpty().withMessage("Le nom est requis"),
    body("email").isEmail().withMessage("Email invalide"),
    body("message")
      .trim()
      .notEmpty()
      .withMessage("Le message est requis")
      .isLength({ min: 10 })
      .withMessage("Le message doit contenir au moins 10 caractères"),
    body("terms")
      .equals("on")
      .withMessage("Vous devez accepter les conditions"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // On renvoie les erreurs au format JSON
      return res.status(400).json({ errors: errors.array() });
    }

    // Simule l’envoi du message (ici juste console.log)
    console.log("Message reçu :", req.body);

    // Réponse JSON de succès
    res.json({
      success: "Votre message a bien été envoyé. Merci pour votre contact !",
    });
  }
);

module.exports = router;
