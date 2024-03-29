import { Api } from "./Api";
import { App } from "@serverless-stack/resources";
import { Automation } from "./Automation";
import { Database } from "./Database";
import { Web } from "./Web";

export default function main(app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });
  app
    .stack(Database)
    .stack(Automation)
    .stack(Api)
    .stack(Web);
}
