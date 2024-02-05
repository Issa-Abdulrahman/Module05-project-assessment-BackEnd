import mongoose from "mongoose";

const productModelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrls: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const ProductSchema = mongoose.model("ProductSchema", productModelSchema);

export default ProductSchema;