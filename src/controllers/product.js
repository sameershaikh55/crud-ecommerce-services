const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/product");
const sendResponse = require("../utils/sendResponse");

// ADD PRODUCT
exports.addProduct = catchAsyncErrors(async (req, res, next) => {
  const productData = await Product.create({
    user: res.user._id,
    ...req.body,
  });

  sendResponse(true, 201, "product", productData, res);
});

// GET ALL PRODUCTS OF A USER
exports.userAllProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find({ user: res.user._id });

  sendResponse(true, 200, "products", products, res);
});

// GET ALL PRODUCTS -- Public
exports.allProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  sendResponse(true, 200, "products", products, res);
});
