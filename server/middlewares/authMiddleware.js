const jwt = require("jsonwebtoken");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/expressError");
const User = require("../model/user");

const authMiddleware = wrapAsync(async (req, res, next) => {
  // console.log(req.cookies, "Cookies in Auth Middleware");
  console.log(req.cookies.token);
  let token = req.cookies.token;

  // console.log("auth running");
  // console.log("token", token);
  if (!token) {
    throw new ExpressError(401, "not Authorized , No Token");
  }
  // console.log(req.headers);
  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // ) {
  try {
    // get token
    // token = req.headers.authorization.split(" ")[1];

    //   decode process
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // get user with the Decoded ID

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new ExpressError(404, "User Not Found");
    }
    // console.log("Auth user", user);
    req.user = user;

    next();
    //   console.log(decoded, "decoded");
  } catch (err) {
    console.log(err);
    throw new ExpressError(401, "Not Authorized");
    // }
  }
});

module.exports = authMiddleware;
