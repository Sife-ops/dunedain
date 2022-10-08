import axios from "axios";
import { Config } from "@serverless-stack/node/config";
import { sign } from "jsonwebtoken";
import { z } from "zod";

const eventSchema = z.object({
  email: z.string(),
});

export const handler = async (event: any) => {
  try {
    const { email } = eventSchema.parse(JSON.parse(event.Records[0].body));

    const accessToken = sign({ email }, Config.SECRET_ACCESS_TOKEN);
    const link =
      Config.STAGE === "prod"
        ? `${Config.WEBSITE_URL}/confirm?accessToken=${accessToken}`
        : `http://localhost:5173/confirm?accessToken=${accessToken}`;

    console.log("confirmation link:", link);

    if (Config.STAGE === "prod") {
      const emailjsRsponse = await axios({
        method: "POST",
        url: "https://api.emailjs.com/api/v1.0/email/send",
        data: {
          service_id: Config.EMAILJS_SERVICE_ID,
          template_id: Config.EMAILJS_TEMPLATE_ID,
          user_id: Config.EMAILJS_USER_ID,
          // accessToken: Config.EMAILJS_ACCESSTOKEN,
          template_params: {
            to_email: email,
            message: link,
          },
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("email status:", emailjsRsponse.data);
    }
  } catch (e) {
    console.log(e);
  }
};
