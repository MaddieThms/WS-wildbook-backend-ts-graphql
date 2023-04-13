import { ApolloServer } from "apollo-server";
import dataSource from "./utils";
import { buildSchema } from "type-graphql";
import { WildersResolver } from "./resolvers.js/WildersResolver";
import { SkillsResolver } from "./resolvers.js/SkillsResolvers";

// Start Server
const start = async (): Promise<void> => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [WildersResolver, SkillsResolver],
  });
  const server = new ApolloServer({ schema });
  try {
    const { url } = await server.listen({ port: 5000 });
    console.log(`Server ready at ${url}`);
  } catch {
    console.log("Error starting the server");
  }
};

void start();
