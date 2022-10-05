import { Config } from "@serverless-stack/node/config";

export const handler = () => {
  console.log(Config.SECRET_ACCESS_TOKEN);
};
