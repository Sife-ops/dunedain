import axios from "axios";
import { Config } from "@serverless-stack/node/config";
import { decode } from "jsonwebtoken";

const { STAGE } = process.env;

export const handler = async (event: any) => {
  try {
    const accessToken = event.headers.authorization;

    const url = `${Config.MANDOS_URL}/verify`;
    const res = await axios.post(url, {
      serviceId: STAGE === "prod" ? "dunedain" : "local",
      accessToken,
    });

    if (res.data.success) {
      const { email, serviceId, userId } = decode(accessToken) as {
        email: string;
        userId: string;
        serviceId: string;
      };

      return {
        isAuthorized: true,
        context: {
          user: {
            email,
            userId,
            serviceId,
          },
        },
      };
    } else {
      throw new Error(`mandos: ${res.data.message}`);
    }
  } catch (e) {
    console.log(e);
    return {
      isAuthorized: false,
    };
  }
};
