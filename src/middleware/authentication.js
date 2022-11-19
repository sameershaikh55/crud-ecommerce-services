const ErrorHandler = require("../utils/errorhandler");
const jwt = require("jsonwebtoken");
const RegistrationModel = require("../models/registration");

exports.authentication = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return next(new ErrorHandler("Failed to obtain access token", 403));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const findUser = await RegistrationModel.findOne({ _id: decoded.id });
    res.user = findUser;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
