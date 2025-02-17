const typeDefs = `#graphql
  type User {
      id: ID!,
      email: String!,
      password: String!
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

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(input: NewUserInput!): User
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: ID!): String
  }
`;

export default typeDefs;
