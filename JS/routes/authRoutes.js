const express = require("express");
const router = express.Router();
const auth = require("../controller/authController");
const requireAuth = require("../middlewares/auth");

router.get("/register", auth.showRegister);
router.post("/register", auth.register);

router.get("/login", auth.showLogin);
router.post("/login", auth.login);

router.get("/profile", requireAuth, auth.profile);

router.post("/logout", auth.logout);

module.exports = router;
