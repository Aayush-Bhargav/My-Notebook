import mongoose from "mongoose";
//specify the schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required?"]
    },
    description: {
        type: String,
        required: [true, "Description is required?"],
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});
const Note = mongoose.model("Note", noteSchema);//first parameter is name of table/collection(mongoose will automatically pluralize the name) and second parameter tells that each document in that collection must adhere to that schema
export default Note;
//use the schema to create a mongoose model
