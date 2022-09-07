import { schema } from "./schema";
import { createGQLHandler } from "@serverless-stack/node/graphql";
import { decode } from 'jsonwebtoken';

export const handler = createGQLHandler({
  schema,
  context: async (request) => {
    const auth = request.event.headers.authorization?.split(' ')[1]
    const { username } = decode(auth!) as { username: string };

    console.log(username);

    if (!username) {
      throw new Error('could not extract username from token');
    }

    return {
      ...request,
      user: {
        userId: username
      },
    };
  },
});
