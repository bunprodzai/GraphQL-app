import express from "express";

import * as database from "./configs/database";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./typeDefs/index.typedefs";
import { resolvers } from "./resolvers/index.resolver";
import { requestAuth } from "./middlewares/auth.middleware";

const app = express();
const port: number | string = process.env.PORT || 3000;

const startServer = async () => {
  dotenv.config();

  database.connect();

  app.use("/graphql", requestAuth);

  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    introspection: true,
    context: ({ req }) => {
      return { ...req};
    }
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    path: "/graphql"
  });
}

startServer();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});