import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("users", userSchema);

export default Users;
