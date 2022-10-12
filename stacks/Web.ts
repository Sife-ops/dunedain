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

  const emailjsSqs = new Queue(stack, "emailjs-lambda", {
    consumer: {
      function: {
        handler: "functions/external/emailjs.handler",
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

  const emailjsSqsUrl = new Config.Parameter(stack, "EMAILJS_SQS", {
    value: emailjsSqs.queueUrl,
  });

  api.routes.addRoutes(stack, {
    "POST /sign-up": {
      function: {
        handler: "functions/rest/sign-up.handler",
        config: [emailjsSqsUrl, db.tableName],
        permissions: [emailjsSqs, db.table],
      },
    },
    "POST /resend-email": {
      function: {
        handler: "functions/rest/resend-email.handler",
        config: [emailjsSqsUrl, db.tableName],
        permissions: [emailjsSqs, db.table],
      },
    },
  });

  stack.addOutputs({
    SITE_URL: web.url,
  });

  return web;
}
