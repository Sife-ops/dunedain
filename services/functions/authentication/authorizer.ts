import { Config } from "@serverless-stack/node/config";
import { verify } from "jsonwebtoken";

export const handler = async (event: any) => {
  try {
    const authHeader = event.headers.authorization;
    const accessToken = authHeader.split(" ")[1];

    // @ts-ignore
    const { email, userId } = verify(accessToken, Config.SECRET_ACCESS_TOKEN);

    return {
      isAuthorized: true,
      context: {
        user: {
          email,
          userId,
        },
      },
    };
  } catch (e) {
    console.log(e);
  }

  return {
    isAuthorized: false,
  };
};
