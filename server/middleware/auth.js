const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys.js");
const userModel = require("../models/users.model.js");

exports.loginCheck = (req, res, next) => {
  try {
    let token = req.headers.token;
    token = token.replace("Bearer ", "");
    decode = jwt.verify(token, JWT_SECRET);
    req.userDetails = decode;
    next();
  } catch (err) {
    res.json({
      error: "You must be logged in",
    });
  }
};


exports.isAuth = (req, res, next) => {
  let { loggedInUserId } = req.body;
  if (
    !loggedInUserId ||
    !req.userDetails._id ||
    loggedInUserId != req.userDetails._id
  ) {
    res.status(403).json({ error: "You are not authenticate" });
  }
  next();
};

// exports.isAdmin = async (req, res, next) => {
//   try {
//     let reqUser = await userModel.findById(req.body.loggedInUserId);
//     // If user role 0 that's mean not admin it's customer
//     console.log("User Role:", reqUser.userRole);
//     if (reqUser.userRole === 0) {
//       res.status(403).json({ error: "Access denied" });
//     }
//     next();
//   } catch {
//     res.status(404);
//   }
// };

exports.isAdmin = async (req, res, next) => {
  try {
    const reqUser = await userModel.findById(req.userDetails._id);
    console.log("User Role:", reqUser.userRole);
    if (!reqUser) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    if (reqUser.userRole === 0) {
      return res.status(403).json({
        error: "Access denied",
      });
    }

    next();
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: "Server error",
    });
  }
};