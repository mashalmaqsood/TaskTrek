const resolvers = {
  Query: {
    users: async (
      _: any,
      __: any,
      context: { dataSources: { users: { getAllUsers: () => any } } }
    ) => {
      try {
        console.log("working userss:::")
        return context.dataSources.users.getAllUsers();
      } catch (error) {
        throw new Error("Failed to fetch users");
      }
    },
    tasks: async (
      _: any,
      __: any,
      context: { dataSources: { tasks: { getAllTasks: () => any } } }
    ) => {
      try {
        return context.dataSources.tasks.getAllTasks();
      } catch (error) {
        throw new Error("Failed to fetch tasks");
      }
    },
    getUserTasks: async (
      _: any,
      { userId }: { userId: string },
      context: {
        user: any;
        dataSources: { tasks: { getUserTasks: (userId: string) => any } };
      }
    ) => {
      try {
        if (!context.user) {
          throw new Error("Not authenticated");
        }
        if (context.user.id !== userId) {
          throw new Error("Forbidden");
        }
        console.log("yes it workeddd!!");
        return context.dataSources.tasks.getUserTasks(userId);
      } catch (error) {
        throw new Error("failed to fetch user tasks");
      }
    },
  },
  Mutation: {
    //mutations for users
    createUser: async (_: any, { input }: any, context: any) => {
      try {
        const newUser = await context.dataSources.users.createUser({
          input,
        });
        return newUser;
      } catch (error) {
        throw new Error("Failed to create user");
      }
    },
    // loginUser: async (_: any, { input }: any, context: any) => {
    //   try {
    //     console.log("loginUser context:::",context)
    //     console.log("tryinggg:::");
    //     const userLogin = await context.dataSources.users.loginUser({
    //       input,
    //       res: context.res,
    //     });
    //     console.log("userLogin::::", userLogin);
    //     return userLogin;
    //   } catch (error) {
    //     console.log("login error",error);
    //     throw new Error("Failed to login user");
    //   }
    // },

    loginUser: async (_: any, { input }: any, context: any) => {
      try {
        const result = await context.dataSources.users.loginUser({ input });
        console.log("result::::",result)
     
        if (result.token) {
          context.res.headers.append(
            "Set-Cookie",
            `authToken=${
              result.token
            }; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax; ${
              process.env.NODE_ENV === "production" ? "Secure" : ""
            }`
          );
        }
        console.log("context:::",result.user);
        return {
          success: result.success,
          message: result.message,
          user: result.user,
        };
      } catch (error) {
        console.log("login error", error);
        throw new Error("Failed to login user");
      }
    },
    updateUser: async (_: any, { input }: any, context: any) => {
      try {
        return await context.dataSources.users.updateUser({
          input,
        });
      } catch (error) {
        throw new Error("Failed to update user");
      }
    },
    deleteUser: async (_: any, id: string, context: any) => {
      try {
        return await context.dataSources.users.deleteUser(id);
      } catch (error) {
        throw new Error("Failed to delete user");
      }
    },

    //mutations for tasks
    createTask: async (_: any, { input }: any, context: any) => {
      try {
        const newTask = await context.dataSources.tasks.createTask({ input });
        return newTask;
      } catch (error) {
        throw new Error("Failed to create task");
      }
    },
    updateTask: async (_: any, { input }: any, context: any) => {
      try {
        return await context.dataSources.tasks.updateTask({ input });
      } catch (error) {
        throw new Error("failed to update the task");
      }
    },
    deleteTask: async (_: any, id: string, context: any) => {
      try {
        return await context.dataSources.tasks.deleteTask(id);
      } catch (error) {
        throw new Error("Failed to delete task");
      }
    },
  },
};

export default resolvers;
