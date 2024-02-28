import config from "./config";
import { GQLTypesGen } from "./schemas/typedef-gen";
import { resolvers } from "./resource/resolvers";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { MongoDataSource } from "./datasource/mongo.datasource";
async function startServer() {
  try {
    // Connect to MongoDB
    await new MongoDataSource(config.MONGO_URL).init();

    // Create an instance of ApolloServer and pass typeDefs
    const server = new ApolloServer({
      typeDefs: new GQLTypesGen("./src/schemas").generateTypeDefs(),
      resolvers,
    });

    const { url } = await startStandaloneServer(server);
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

// Start the server
startServer();
