  // TODO Module
  const path = require("path");
  require("dotenv").config({ path: path.join(__dirname, "../.env") });
  const express = require("express");
  const app = express();
  const expressLayouts = require("express-ejs-layouts");
  const cookieParser = require("cookie-parser");
  const authRoutes = require("./routes/authRoutes");
  const currentUser = require("./middlewares/currentUser");
const methodOverride = require('method-override');
  const rateLimit = require("express-rate-limit");
  const contactRoutes = require("./controller/contact");

// TODO Fichiers
const connectMongoDB = require("./data/mongoData");
const routerPage = require("./routes/routePage");
const authPage = require("./routes/authRoutes");
app.use(methodOverride('_method'));

  // TODO Coniguration ejs
  app.set("view engine", "ejs");
  app.set("views", __dirname + "/../views");
  app.set("layout", "layout");

  // TODO Middleware
  app.use(express.json());
  app.use(expressLayouts);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "../public")));

  app.use(cookieParser());
  app.use(currentUser);
  // app.use(limiter);
  // TODO Connexion à MongoDB
  connectMongoDB();

  app.use("/", routerPage);

  // Création du middleware de limitation
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Max 100 requêtes par IP pendant ce délai
    standardHeaders: "draft-8", // Utilise les headers standard "RateLimit"
    legacyHeaders: false, // Désactive les anciens headers X-RateLimit-*
    ipv6Subnet: 56, // Pour limiter plus ou moins agressivement les IP v6

    // Message personnalisé si la limite est dépassée
    handler: (req, res, next, options) => {
      res.status(options.statusCode).json({
        status: options.statusCode,
        error: "T'as pas le droit ! T'as dépassé la limite.",
      });
    },
  });
  app.use("/contact", contactRoutes);
  app.use("/", limiter, authRoutes);
  app.use("/", (req, res, next) => {
    console.log("Request received");
    next();
  });

  app.listen(3000, () => {
    console.log("Server is running on port: http://localhost:3000/");
  });