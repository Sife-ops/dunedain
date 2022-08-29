import {
  StackContext,
  use,
  Api as ApiGateway,
  Config,
} from "@serverless-stack/resources";

import { Database } from "./Database";
import { Auth } from "./Auth";

export function Api({ stack }: StackContext) {
  const auth = use(Auth);
  const db = use(Database);

  const api = new ApiGateway(stack, "api", {
    defaults: {
      function: {
        permissions: [db.table],
        config: [db.TABLE_NAME],
      },
    },
    routes: {
      "POST /graphql": {
        type: "pothos",
        function: {
          handler: "functions/graphql/graphql.handler",
        },
        schema: "services/functions/graphql/schema.ts",
        output: "graphql/schema.graphql",
        commands: [
          "npx genql --output ./graphql/genql --schema ./graphql/schema.graphql --esm",
        ],
      },
    },
  });

  auth.attachPermissionsForAuthUsers(stack, [api]);

  new Config.Parameter(stack, "API_URL", {
    value: api.url,
  });

  stack.addOutputs({
    API_URL_OUTPUT: api.url,
  });

  return api;
}
