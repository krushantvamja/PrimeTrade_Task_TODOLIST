import mongoose from "mongoose";
import Task from "../models/Task.js";

const createTask = async (req, res) => {
  const { title, description = "", status = "pending" } = req.body;

  const task = await Task.create({
    title,
    description,
    status,
    user: req.user._id
  });

  return res.status(201).json(task);
};

const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
  return res.status(200).json(tasks);
};

const updateTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid task id" });
  }

  const task = await Task.findOne({ _id: id, user: req.user._id });
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = req.body.title ?? task.title;
  task.description = req.body.description ?? task.description;
  task.status = req.body.status ?? task.status;

  const updatedTask = await task.save();
  return res.status(200).json(updatedTask);
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid task id" });
  }

  const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.status(200).json({ message: "Task deleted successfully" });
};

export { createTask, getTasks, updateTask, deleteTask };
