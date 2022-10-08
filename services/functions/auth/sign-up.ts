import AWS from "aws-sdk";
import bcrypt from "bcryptjs";
import { Config } from "@serverless-stack/node/config";
import { dunedainModel } from "@dunedain/core/model";
import { z } from "zod";

const sqs = new AWS.SQS();

const eventSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const handler = async (event: any) => {
  try {
    const { email, password } = eventSchema.parse(JSON.parse(event.body));

    const {
      data: found,
    } = await dunedainModel.entities.UserEntity.query.email({ email }).go();

    if (found.length > 0) {
      return {
        success: false,
        message: "An account with that e-mail address already exists.",
      };
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
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: JSON.stringify(e),
    };
  }
};
