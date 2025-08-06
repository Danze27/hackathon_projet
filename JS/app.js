// TODO Module
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");

// TODO Fichiers
const connectMongoDB = require("./data/mongoData");

// TODO Coniguration ejs
app.set("view engine", "ejs");
app.set("views", __dirname + "/../views");
app.set("layout", "layout");

// TODO Middleware
app.use(express.json());
app.use(expressLayouts);
app.use(cookieParser());

// TODO Connexion à MongoDB
connectMongoDB();

app.use("/", authRoutes);
app.use("/", (req, res, next) => {
  console.log("Request received");
  next();
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
