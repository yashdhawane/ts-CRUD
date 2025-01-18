import  { Schema,model } from "mongoose";

// Define User Schema
const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const UserModel = model("User", UserSchema);
export default UserModel;