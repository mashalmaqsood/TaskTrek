const typeDefs = `#graphql
  type User {
      id: ID!,
      email: String!,
      password: String!
  }

  type Task{
     id: ID!,
     title: String!,
     description: String!,
     priority: String!,
     userId: String!,
     status: String!,
     assignee: String!,
     dueDate: String
  }

  input NewUserInput {
      id: ID,
      email: String!,
      password: String!
  }

  input UpdateUserInput {
    id: ID,
    email: String,
    password: String
  }
  
  input NewTaskInput {
     id: ID,
     title: String!,
     description: String!,
     priority: String!,
     userId:String,
     status: String!,
     assignee: String!,
     dueDate: String
  }

  input UpdateTaskInput {
     id: ID,
     title: String,
     description: String,
     priority: String,
     status: String,
     assignee: String,
     dueDate: String
 }

type TaskResult {
  success: Boolean,
  message: String,
  tasks: [Task] 
}

type Query {
    users: [User],
    tasks: [Task],
    getUserTasks(userId: String): [Task]
}

  type AuthPayload{
  success: Boolean,
  message: String,
  user: User
}

  type Mutation {
    createUser(input: NewUserInput!): User
    loginUser(input:NewUserInput!):AuthPayload
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: ID!): String
    createTask(input: NewTaskInput!):Task
    updateTask(input:UpdateTaskInput!):Task
    deleteTask(id:ID!):String
  }
  `;

export default typeDefs;
