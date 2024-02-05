import mongoose from "mongoose";

const userModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: Number,
      required: false,
    },
    role: {
      type: String,
      enum: ["admin", "registered", "unregistered"],
      required: true,
    },
  },
  { timestamps: true }
);

const UserSchema = mongoose.model("UserSchema", userModelSchema);

export default UserSchema;