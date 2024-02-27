import mongoose from "mongoose";
import config from "./config";
import { GQLTypesGen } from "./schemas/typedef-gen";
import { resolvers } from "./resource/products/products.resolvers";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

async function startServer() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.MONGO_URL, {});

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
