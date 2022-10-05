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
      VITE_API_URL: api.url,
      VITE_REGION: app.region,
      VITE_STAGE: app.stage,
    },
  });

  stack.addOutputs({
    SITE_URL: site.url,
  });

  return api;
}
