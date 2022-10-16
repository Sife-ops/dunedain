import { StackContext, ViteStaticSite, use } from "@serverless-stack/resources";

import { Api } from "./Api";

export function Web({ stack, app }: StackContext) {
  const api = use(Api);

  const web = new ViteStaticSite(stack, "web", {
    path: "web",
    buildCommand: "npm run build",
    environment: {
      VITE_API_URL: api.routes.url,
      VITE_REGION: app.region,
      VITE_STAGE: app.stage,
    },
  });

  stack.addOutputs({
    SITE_URL: web.url,
  });

  return web;
}
