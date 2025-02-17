const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    email: {type: String, required : [true,"All fields are required"]},
    password: {type: String, required : [true,"All fields are required"]}
})

export default mongoose.models.UserModel || mongoose.model("UserModel", userSchema);