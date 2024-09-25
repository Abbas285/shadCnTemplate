import mongoose from "mongoose";

const User = mongoose.Schema(
  { 
    name: String,
    username:String,
    email:String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", User);