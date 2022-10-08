import AWS from "aws-sdk";
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
        message: "email already in use",
      };
    }

    await sqs
      .sendMessage({
        QueueUrl: Config.ONBOARD_SQS!,
        MessageBody: JSON.stringify({ email, password }),
        MessageGroupId: "onboard",
      })
      .promise();

    return {
      success: true,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "something bad happened", // todo: parse errors?
    };
  }
};
