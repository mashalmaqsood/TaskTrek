import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import {Users,Tasks} from "@/app/datasources/index"
import {UserModel,TaskModel}from "@/app/models/index";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

const connectDb = async () => {
  try {
    if (uri) {
      await mongoose.connect(uri);
      console.log("🎉 Connected to database successfully");
    }
  } catch (err) {
    console.log(err);
  }
};

connectDb();

//setting up Apollo Server
const server: any = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req, res) => ({
    req,
    res,
    dataSources: {
      users: new Users({ modelOrCollection: UserModel }),
      tasks: new Tasks({modelOrCollection: TaskModel})
    },
  }),
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
    console.log("requestttt::::",request)
  return handler(request);
}
