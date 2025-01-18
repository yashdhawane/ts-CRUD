import mongoose, { Schema,model } from "mongoose";

const ObjectId = mongoose.Types.ObjectId;
const taskSchema = new Schema({
   
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["pending", "completed", "in-progress"],
      default: "pending",
    },
    userId: { type: ObjectId, ref: "User", required: true },


});

 const TaskModel = model("Task", taskSchema);    
export default TaskModel;