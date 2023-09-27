import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    id: { type: String, requried: [true] },
    title: { type: String },
    isCompleted: { type: String },
    priority: { type: String },
});

export default mongoose.model('Todo', todoSchema);