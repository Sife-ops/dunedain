import { schema } from "./schema";
import { GraphQLHandler } from "@serverless-stack/node/graphql";

export const handler = GraphQLHandler({
  schema,
  context: async (request) => {
    // @ts-ignore
    const user = request.event.requestContext.authorizer.lambda.user;

    return {
      ...request,
      user,
    };
  },
});
