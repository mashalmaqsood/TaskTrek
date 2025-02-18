const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: { type: String, required: ["All fields are required"] },
    description: { type: String, required: ["All fields are required"] },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: { type: String, enum: ["todo", "in-progress", "completed"], default:"todo"},
    assignee: { type: String, required: true },
    dueDate: { type: String, required: ["All fields are required"] },
  },
  { timestamps: true }
);

export default mongoose.models.TaskModel || mongoose.model("TaskModel", taskSchema);
