const jwt = require("jsonwebtoken");
const User = require("../model/user");
const ExpressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");

const authAdminMiddleware = wrapAsync(async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    throw new ExpressError(401, "Not Authorized , No Token");
  }
  //   if (
  //     req.headers.authorization &&
  //     req.headers.authorization.startsWith("Bearer")
  //   ) {
  //     token = req.headers.authorization.split(" ")[1];
  // }
  const decode = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decode.id).select("-password");

  if (!user) {
    throw new ExpressError(404, "User Not Exist");
  }

  if (user.role == "Admin" || user.role === "Editor") {
    req.user = user;
    next();
  } else {
    throw new Error(403, "Unauthorized: Admin Only");
  }
});

const authAdminOnlyMiddleware = (req, res, next) => {
  if (req.user.role !== "Admin") {
    throw new ExpressError(
      403,
      "Unauthorized: Only Admin Can Perform This Action"
    );
  }
  next();
};
module.exports = { authAdminMiddleware, authAdminOnlyMiddleware };
