const bcrypt = require("bcryptjs");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const RegistrationModel = require("../models/registration");
const sendToken = require("../utils/jwtToken");
const sendResponse = require("../utils/sendResponse");

exports.register = catchAsyncErrors(async (req, res, next) => {
  const { fname, lname, email, phone, password } = req.body;

  if (!fname || !lname || !email || !phone || !password) {
    return next(new ErrorHandler("Invalid field", 422));
  }

  const gettingRecord = await RegistrationModel.findOne({ email });

  if (gettingRecord) {
    return next(new ErrorHandler("Email already exist", 422));
  } else {
    const userData = await RegistrationModel.create(req.body);
    sendToken(userData, 201, res);
  }
});

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(new ErrorHandler("Invalid field", 422));

  const gettingRecord = await RegistrationModel.findOne({ email }).select(
    "+password"
  );

  if (!gettingRecord) return next(new ErrorHandler("user not found", 404));

  const validPassword = await bcrypt.compare(password, gettingRecord.password);

  if (!validPassword)
    return next(new ErrorHandler("Invalid email and password", 400));

  sendToken(gettingRecord, 200, res);
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  sendResponse(true, 200, "message", "logged out successfully", res);
});

// GET USER DATA WITH TOKEN AUTHENTICATION
exports.getUserData = catchAsyncErrors(async (req, res, next) => {
  sendResponse(true, 200, "user", res.user, res);
});

// CHANGES AND UPDATE USER PROFILE PICTURE
exports.changeUserImage = catchAsyncErrors(async (req, res, next) => {
  const gettingRecord = await RegistrationModel.findByIdAndUpdate(
    res.user._id,
    req.body,
    {
      new: true,
    }
  );

  sendResponse(true, 200, "user", gettingRecord, res);
});
