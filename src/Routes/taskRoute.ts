import express, { Request, Response } from "express";

import { authMiddleware } from "../Middleware/authmiddleware";
import TaskModel from "../Models/task";

const TaskRouter=express.Router()


// Get all tasks
//@ts-ignore
TaskRouter.get("/get",authMiddleware,async (req: Request, res: Response) => {
  //@ts-ignore
    const id=req.user
    const AllTask = await TaskModel.find({userId:id});
    console.log(AllTask)
    return res.status(200).json({message:"task",AllTask});
  });

  //@ts-ignore
  TaskRouter.post("/add", authMiddleware,async (req: Request, res: Response) => {
    try {
      const { title, description, status } = req.body;
      // @ts-ignore: req.user is added by authMiddleware
      const userId = req.user;
  
      const newTask = await TaskModel.create({
        // Add user reference
        title, description, status ,
        userId:userId,
      });
  
      return res.status(201).json({
        message: "Task created",
        task: newTask
      });
    } catch (error) {
      return res.status(500).json({ message: "Error creating task", error });
    }
  });

//@ts-ignore
  TaskRouter.delete("/delete/:id", authMiddleware,async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      // @ts-ignore: req.user is added by authMiddleware
      const userId = req.user;
  
      const task = await TaskModel.findOneAndDelete({ 
        _id: id,
        userId: userId // Ensure task belongs to user
      });
  
      if (!task) {
        return res.status(404).json({ message: "Task not found or unauthorized" });
      }
  
      return res.status(200).json({ message: "Task deleted" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting task", error });
    }
  });

// Update task
//@ts-ignore
TaskRouter.put("/:id", authMiddleware,async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title,description,status } = req.body;
  
  const response = await TaskModel.findByIdAndUpdate(
    id,
    { title,description,status },
    { new: true } // This returns the updated document
  );

  return res.status(200).json({ message: "Task updated", task: response });
});

export default TaskRouter