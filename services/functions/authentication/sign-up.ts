import AWS from "aws-sdk";
import bcrypt from "bcryptjs";
import { Config } from "@serverless-stack/node/config";
import { dunedainModel } from "@dunedain/core/model";
import { wrapError } from "./common";
import { z } from "zod";

const sqs = new AWS.SQS();

const eventSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const signUp = async (event: any) => {
  const { email, password } = eventSchema.parse(JSON.parse(event.body));

  const { data: found } = await dunedainModel.entities.UserEntity.query
    .email({ email })
    .go();

  if (found.length > 0) {
    const [user] = found;
    if (!user.confirmed) {
      await dunedainModel.entities.UserEntity.delete(user).go();
    } else {
      throw new Error("An account with that e-mail address already exists.");
    }
  }

  const hash = bcrypt.hashSync(password, 8);

  await dunedainModel.entities.UserEntity.create({
    email,
    password: hash,
  }).go();

  await sqs
    .sendMessage({
      QueueUrl: Config.ONBOARD_SQS!,
      MessageBody: JSON.stringify({ email }),
      MessageGroupId: "onboard",
    })
    .promise()
    .then((e) => console.log(e));

  return {
    success: true,
  };
};

export const handler = wrapError(signUp);
