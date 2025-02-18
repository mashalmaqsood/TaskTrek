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
     status : String!,
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
     status : String!,
     assignee: String!,
     dueDate: String
  }

  input UpdateTaskInput {
     id: ID,
     title: String,
     description: String,
     priority: String,
     status : String,
     assignee: String,
     dueDate: String
  }

  type Query {
    users: [User],
    tasks: [Task]
  }

  type Mutation {
    createUser(input: NewUserInput!): User
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: ID!): String
    createTask(input: NewTaskInput!):Task
    updateTask(input:UpdateTaskInput!):Task
    deleteTask(id:ID!):String
  }
`;

export default typeDefs;
