const jwt = require("jsonwebtoken");
const User = require("../model/user");
const ExpressError = require("../utils/expressError");
const wrapAsync = require("../utils/wrapAsync");

const authUserRole = wrapAsync(async (req, res, next) => {
  let token = req.cookies.token;
  //   console.log(token);

  if (!token) {
    // user.role = "User";
    // console.log("thissssss tokennnnn");
    req.user = { role: "User" };
    next();
  } else {
    // console.log("thissssss after tokennnnn");
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode.id).select("-password");
    // console.log("thissssss userrrrrrrrr");

    if (!user) {
      // user.role = "User";
      //   console.log("thissssss");
      req.user = { role: "User" };
      next();
    } else {
      //   console.log("thissssss toooooooooo");
      req.user = user;
      next();
    }
  }
});

module.exports = { authUserRole };
