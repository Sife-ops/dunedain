import { schema } from "./schema";
import { createGQLHandler } from "@serverless-stack/node/graphql";

export const handler = createGQLHandler({
  schema,
  context: async (request) => {
    console.log(request);
    return request;
  },
});
