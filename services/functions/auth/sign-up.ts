import axios from "axios";
import bcrypt from "bcryptjs";
import { Config } from "@serverless-stack/node/config";
import { dunedainModel } from "@dunedain/core/model";
import { z } from "zod";

export const handler = async (event: any) => {
  const eventSchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const { email, password } = eventSchema.parse(JSON.parse(event.body));

  const { data: found } = await dunedainModel.entities.UserEntity.query
    .email({ email })
    .go();

  if (found.length > 0) {
    return {
      success: false,
      message: "email already in use",
    };
  }

  const hash = bcrypt.hashSync(password, 8);

  const { data: created } = await dunedainModel.entities.UserEntity.create({
    email,
    password: hash,
  }).go();

  // // todo: disabled in dev
  // const emailjsRsponse = await axios({
  //   method: "POST",
  //   url: "https://api.emailjs.com/api/v1.0/email/send",
  //   data: {
  //     service_id: Config.EMAILJS_SERVICE_ID,
  //     template_id: Config.EMAILJS_TEMPLATE_ID,
  //     user_id: Config.EMAILJS_USER_ID,
  //     // accessToken: Config.EMAILJS_ACCESSTOKEN,
  //     template_params: {
  //       to_email: created.email,
  //       message: created.otp,
  //     },
  //   },
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // console.log(emailjsRsponse.data);

  return {
    success: true,
  };
};
