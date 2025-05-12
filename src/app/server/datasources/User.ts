import UserModel from "../models/User";
import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId } from "mongoose";
import mongoose from "mongoose";

const jwt = require("jsonwebtoken");

interface UserDocument {
  id: ObjectId;
  email: string;
  password: string;
}

export default class Users extends MongoDataSource<UserDocument> {
  //Function to get all users
  async getAllUsers() {
    try {
      return await UserModel.find();
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  }

  // Function to create a new user
  async createUser({ input }: any) {
    console.log("createUser", input);
    try {
      return await UserModel.create({ ...input });
    } catch (error) {
      throw new Error("Failed to create user");
    }
  }

  // Inside Users data source
  async loginUser({ input }: { input: any }) {
    const { id } = input;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        success: false,
        message: "Invalid user ID format",
        user: null,
        token: null,
      };
    }

    const user = await UserModel.findById(id);
    if (!user) {
      return {
        success: false,
        message: "User not found",
        user: null,
        token: null,
      };
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      success: true,
      message: "Logged in!",
      user: { id: user._id, email: user.email },
      token,
    };
  }

  //Function to update user details
  async updateUser({ input }: any) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        input.id,
        { ...input },
        { new: true }
      );

      return updatedUser;
    } catch (error) {
      throw new Error("Failed to update the user details");
    }
  }

  //Function to delete a user record
  async deleteUser({ id }: { id: string }): Promise<string> {
    try {
      await UserModel.findByIdAndDelete(id);
      return "User record deleted successfully!";
    } catch (error) {
      throw new Error("Failed to delete user record!");
    }
  }
}
