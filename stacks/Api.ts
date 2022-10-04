import {
  StackContext,
  use,
  Api as ApiGateway,
  Config,
} from "@serverless-stack/resources";

import { Auth } from "./Auth";
import { Automation } from "./Automation";
import { Database } from "./Database";

export function Api({ stack }: StackContext) {
  const auth = use(Auth);
  const automation = use(Automation);
  const db = use(Database);

  const api = new ApiGateway(stack, "api", {
    authorizers: {
      jwt: {
        type: "user_pool",
        userPool: {
          id: auth.userPoolId,
          clientIds: [auth.userPoolClientId],
        },
      },
    },
    defaults: {
      authorizer: "jwt",
      function: {
        permissions: [db.table, automation.fetchFaviconSqs],
        config: [db.tableName, automation.FAVICON_SQS],
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
