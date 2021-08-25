const {ApolloServer, gql} = require('apollo-server-lambda');
import { typeDefs } from "./../graphql/schema";
import { resolvers } from "./../graphql/resolvers";

const server = new ApolloServer({typeDefs, resolvers});
exports.graphqlHandler = server.createHandler();
