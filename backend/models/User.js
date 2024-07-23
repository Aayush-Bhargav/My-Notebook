import mongoose from "mongoose";
//specify the schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required?"]
    },
    email: {
        type: String,
        required: [true, "Email is required?"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required?"]
    },
    date:{
        type:Date,
        default:Date.now
    }
});
const User=mongoose.model("User",userSchema);//first parameter is name of table/collection(mongoose will automatically pluralize the name) and second parameter tells that each document in that collection must adhere to that schema
export default User;
//use the schema to create a mongoose model
