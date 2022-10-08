import {
  Config,
  Queue,
  StackContext,
  ViteStaticSite,
  use,
} from "@serverless-stack/resources";

import { Api } from "./Api";
import { Database } from "./Database";

export function Web({ stack, app }: StackContext) {
  const api = use(Api);
  const db = use(Database);

  const web = new ViteStaticSite(stack, "web", {
    path: "web",
    buildCommand: "npm run build",
    environment: {
      VITE_API_URL: api.routes.url,
      VITE_REGION: app.region,
      VITE_STAGE: app.stage,
    },
  });

  const onboardSqs = new Queue(stack, "onboard-lambda", {
    consumer: {
      function: {
        handler: "functions/automation/onboard.handler",
        config: [
          new Config.Secret(stack, "EMAILJS_SERVICE_ID"),
          new Config.Parameter(stack, "EMAILJS_TEMPLATE_ID", {
            value: "template_pwk79e6",
          }),
          new Config.Secret(stack, "EMAILJS_USER_ID"),
          // todo: rename to SITE_URL
          new Config.Parameter(stack, "WEBSITE_URL", {
            value: web.url,
          }),
          // new Config.Secret(stack, "EMAILJS_ACCESSTOKEN"),
          api.secretAccessToken,
          new Config.Parameter(stack, "STAGE", {
            value: app.stage,
          }),
          db.tableName,
        ],
        permissions: [db.table],
      },
    },
    cdk: {
      queue: {
        contentBasedDeduplication: true,
        fifo: true,
      },
    },
  });

  api.routes.addRoutes(stack, {
    "POST /sign-up": {
      function: {
        handler: "functions/auth/sign-up.handler",
        config: [
          new Config.Parameter(stack, "ONBOARD_SQS", {
            value: onboardSqs.queueUrl,
          }),
          db.tableName,
        ],
        permissions: [onboardSqs, db.table],
      },
    },
  });

  stack.addOutputs({
    SITE_URL: web.url,
  });

  return web;
}
