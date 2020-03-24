const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies["token"];
  try {
    const decoded = jwt.verify(token, "somesupersecretsecret");
    req.userId = decoded.userid;
    next();
  } catch (error) {
    error.statusCode = 401;
    error.message = "Not logged in";
    next(error);
  }
};