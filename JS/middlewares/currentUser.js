const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  res.locals.currentUser = null;

  const token = req.cookies?.token;
  if (token) {
    try {
      res.locals.currentUser = jwt.verify(
        token,
        process.env.SECRET_KEY || "dev-secret-change-me"
      ).username;
    } catch (_) {}
  }
  next();
};
