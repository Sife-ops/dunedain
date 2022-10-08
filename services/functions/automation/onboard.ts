import axios from "axios";
import bcrypt from "bcryptjs";
import { Config } from "@serverless-stack/node/config";
import { dunedainModel } from "@dunedain/core/model";
import { sign } from "jsonwebtoken";
import { z } from "zod";

const eventSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const handler = async (event: any) => {
  try {
    const { email, password } = eventSchema.parse(
      JSON.parse(event.Records[0].body)
    );

    const hash = bcrypt.hashSync(password, 8);

    const { data: created } = await dunedainModel.entities.UserEntity.create({
      email,
      password: hash,
    }).go();

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
            to_email: created.email,
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
