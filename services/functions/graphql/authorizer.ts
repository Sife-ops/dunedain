import axios from "axios";
// import { dunedainModel } from "@dunedain/core/model";
// import { Config } from "@serverless-stack/node/config";
import { decode } from "jsonwebtoken";

export const handler = async (event: any) => {
  const accessToken = event.headers.authorization;

  const url = "https://eqcwibjl5l.execute-api.us-east-1.amazonaws.com/verify";
  const res = await axios.post(url, {
    serviceId: "local",
    accessToken,
  });

  console.log("mandos response:", res.data);

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
    return {
      isAuthorized: false,
    };
  }
};
