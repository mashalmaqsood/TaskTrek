import UserModel from "../../app/models/User";
import { MongoDataSource } from "apollo-datasource-mongodb";
import { ObjectId } from "mongoose";

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

  //Function to update user details
  async updateUser({ input }: any) {
    console.log("updateUser dataa",input)
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        input.id,
        { ...input },
        { new: true }
      );

      console.log("updated user",updatedUser);
      return updatedUser;
    } catch (error) {
      throw new Error("Failed to update the user details");
    }
  }

  //Function to delete a user record
  async deleteUser ({ id }: { id: string }) : Promise<string>{
    try{
      await UserModel.findByIdAndDelete(id);
      return "User record deleted successfully!"
    }catch(error){
      throw new Error("Failed to delete user record!")
    }
  }
}
