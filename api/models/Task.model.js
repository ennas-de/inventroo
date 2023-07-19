// models/Post.model.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;

// name: Joi.string().alphanum().min(3).max(30).required(),
// email: Joi.string().email().required(),
// password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
// repeat_password: Joi.ref('password'),
// birth_year: Joi.number().integer().min(1900).max(2013),
// address: Joi.string().required(),
