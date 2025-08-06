import mongoose from "mongoose";
// 1 - create a schema
// 2- model based off ofthat schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    content: {
        type: String,
        required: true,
    },
},
{ timestamp: true } // Automatically adds createdAt and updatedAt fields
);

// 3 - create a model
const Note = mongoose.model("Note", noteSchema);
// 4 - export the model
export default Note;