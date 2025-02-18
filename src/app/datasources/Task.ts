import TaskModel from "../models/Task";
import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId } from "mongoose";

interface TaskDocument {
  id: ObjectId;
  title: string;
  description: string;
  priority: string;
  status: string;
  assignee: string;
  dueDate: Date;
}

export default class Tasks extends MongoDataSource<TaskDocument> {
  //Function to get all tasks
  async getAllTasks() {
    try {
      return await TaskModel.find();
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  }

  // Function to create a new task
  async createTask({ input }: any) {
    try {
      return await TaskModel.create({ ...input });
    } catch (error) {
      throw new Error("Failed to create task");
    }
  }

  //Function to update task details
  async updateTask({ input }: any) {
    try {
      const updatedUser = await TaskModel.findByIdAndUpdate(
        input.id,
        { ...input },
        { new: true }
      );
      return updatedUser;
    } catch (error) {
      throw new Error("Failed to update the user details");
    }
  }

  //Function to delete a task record
  async deleteTask({ id }: { id: string }): Promise<string> {
    try {
      await TaskModel.findByIdAndDelete(id);
      return "Task deleted successfully!";
    } catch (error) {
      throw new Error("Failed to delete the task!");
    }
  }
}
