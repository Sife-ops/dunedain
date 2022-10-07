import {
  Config,
  StackContext,
  use,
  ViteStaticSite,
} from "@serverless-stack/resources";

import { Api } from "./Api";

export function Web({ stack, app }: StackContext) {
  const api = use(Api);

  const site = new ViteStaticSite(stack, "site", {
    path: "web",
    buildCommand: "npm run build",
    environment: {
      VITE_API_URL: api.routes.url,
      VITE_REGION: app.region,
      VITE_STAGE: app.stage,
    },
  });

  api.routes.addRoutes(stack, {
    "POST /sign-up": {
      function: {
        handler: "functions/auth/sign-up.handler",
        config: [
          new Config.Secret(stack, "EMAILJS_SERVICE_ID"),
          new Config.Parameter(stack, "EMAILJS_TEMPLATE_ID", {
            value: "template_pwk79e6",
          }),
          new Config.Secret(stack, "EMAILJS_USER_ID"),
          // todo: rename to SITE_URL
          new Config.Parameter(stack, "WEBSITE_URL", {
            value: site.url,
          }),
          // new Config.Secret(stack, "EMAILJS_ACCESSTOKEN"),
        ],
      },
    },
  });

  stack.addOutputs({
    SITE_URL: site.url,
  });

  return api;
}
