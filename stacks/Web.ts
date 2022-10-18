import { StackContext, ViteStaticSite, use } from "@serverless-stack/resources";

import { Api } from "./Api";

export function Web({ stack, app }: StackContext) {
  const api = use(Api);

  const { MANDOS_URL, MANDOS_URL_CLOUDFRONT, DOMAIN, SUBDOMAIN } = process.env;
  if (!MANDOS_URL) throw new Error("MANDOS_URL undefined");
  if (!MANDOS_URL_CLOUDFRONT)
    throw new Error("MANDOS_URL_CLOUDFRONT undefined");
  if (!DOMAIN) throw new Error("DOMAIN undefined");
  if (!SUBDOMAIN) throw new Error("SUBDOMAIN undefined");

  const web = new ViteStaticSite(stack, "web", {
    path: "web",
    buildCommand: "npm run build",
    environment: {
      VITE_API_URL: api.routes.url,
      VITE_REGION: app.region,
      VITE_STAGE: app.stage,
      VITE_MANDOS_URL: MANDOS_URL,
      VITE_MANDOS_URL_CLOUDFRONT: MANDOS_URL_CLOUDFRONT,
    },
    customDomain: {
      domainName: `${SUBDOMAIN}.${DOMAIN}`,
      domainAlias: `www.${SUBDOMAIN}.${DOMAIN}`,
      hostedZone: `${DOMAIN}`,
    },
  });

  stack.addOutputs({
    SITE_URL: web.url,
  });

  return web;
}
