const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please Enter Product Name"],
    maxLength: [30, "Product Name cannot exceed 30 characters"],
    minLength: [3, "Product Name should have more than 3 characters"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Please Enter the description"],
    maxLength: [100, "Description cannot exceed 100 characters"],
    minLength: [20, "Description should have more than 20 characters"],
  },
  price: {
    type: Number,
    trim: true,
    required: [true, "Please Enter the Price"],
    maxLength: [5, "Price cannot exceed 5 digits"],
    minLength: [2, "Price should have more than 2 digits"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter the Stock"],
    trim: true,
    maxLength: [4, "Stock cannot exceed 4 digits"],
    minLength: [1, "Stock should have more than 1 digits"],
  },
  picture: {
    type: String,
    trim: true,
    required: [true, "Please upload product image"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Products = new model("products", productSchema);
module.exports = Products;
