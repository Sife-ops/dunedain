import { StackContext, use, ViteStaticSite } from "@serverless-stack/resources";
import { Api } from "./Api";
// import { Auth } from "./Auth";

export function Web({ stack, app }: StackContext) {
  const api = use(Api);
  // const auth = use(Auth);

  const site = new ViteStaticSite(stack, "site", {
    path: "web",
    buildCommand: "npm run build",
    environment: {
      VITE_GRAPHQL_URL: api.url + "/graphql",
      VITE_REGION: app.region,
      // VITE_USER_POOL_ID: auth.userPoolId,
      // VITE_USER_POOL_CLIENT_ID: auth.userPoolClientId,
      // VITE_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId || "",
      VITE_STAGE: app.stage,
    },
  });

  stack.addOutputs({
    SITE_URL: site.url,
  });

  return api;
}
