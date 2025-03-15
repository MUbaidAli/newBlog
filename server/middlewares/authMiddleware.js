const jwt = require("jsonwebtoken");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/expressError");
const User = require("../model/user");

const authMiddleware = wrapAsync(async (req, res, next) => {
  let token;

  console.log(req.headers);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token
      token = req.headers.authorization.split(" ")[1];

      //   decode process
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user with the Decoded ID

      req.user = await User.findById(decoded.id).select("-password");

      next();
      //   console.log(decoded, "decoded");
    } catch (err) {
      throw new ExpressError(401, "Not Authorized");
      console.log(err);
    }
  }

  if (!token) {
    throw new ExpressError(401, "not Authorized , No Token");
  }
});

module.exports = authMiddleware;
