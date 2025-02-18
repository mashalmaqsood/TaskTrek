const resolvers = {
  Query: {
    users: async (
      _: any,
      __: any,
      context: { dataSources: { users: { getAllUsers: () => any } } }
    ) => {
      try {
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
  },
  Mutation: {
    //mutations for users
    createUser: async (_: any, { input }: any, context: any) => {
        console.log("create user payloaddd",context)
      try {
        const newUser = await context.dataSources.users.createUser({
          input,
        });
        return newUser;
      } catch (error) {
        throw new Error("Failed to create user");
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

  