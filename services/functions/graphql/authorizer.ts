import axios from "axios";
import { Config } from "@serverless-stack/node/config";
import { decode } from "jsonwebtoken";

export const handler = async (event: any) => {
  try {
    const accessToken = event.headers.authorization;

    const url = `${Config.MANDOS_API_URL}/verify`;
    const res = await axios.post(url, { accessToken });

    if (res.data.success) {
      const { email, userId } = decode(accessToken) as {
        email: string;
        userId: string;
      };

      return {
        isAuthorized: true,
        context: {
          user: {
            email,
            userId,
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
