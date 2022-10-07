import bcrypt from "bcryptjs";
import { dunedainModel } from "@dunedain/core/model";
import { z } from "zod";
// import aws = require("@aws-sdk/client-ses");
// let { defaultProvider } = require("@aws-sdk/credential-provider-node");
import { defaultProvider } from "@aws-sdk/credential-provider-node";
// import {} from "@aws-sdk/client-ses";

export const handler = async (event: any) => {

  // const ses = new aws.SES({
  //   apiVersion: "2010-12-01",
  //   region: "us-east-1",
  //   defaultProvider,
  // });

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

  const res = await dunedainModel.entities.UserEntity.create({
    email,
    password: hash,
  }).go();

  return {
    success: true,
  };
};
