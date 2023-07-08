const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  // console.log("token", token);
  if (token) {
    try {
      let decoded = jwt.verify(token, "key");
      // console.log(decoded);
      if (decoded.userId) {
        req.userId = decoded.userId;
      }
      next();
    } catch (err) {
      console.log("catch called in decoded in jwt.verify", err);
      res.status(400).json({
        success: false,
        message: "You are not authenticated",
        err: err,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "You are not authenticated",
    });
  }
};

module.exports = {
  authenticate,
};
