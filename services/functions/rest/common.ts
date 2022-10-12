import AWS from "aws-sdk";
import { Config } from "@serverless-stack/node/config";
import { serializeError } from "serialize-error";

const sqs = new AWS.SQS();

export const wrapError = (handler: (event: any) => Promise<any>) => {
  return async (event: any) => {
    try {
      return await handler(event);
    } catch (e) {
      console.log(e);
      const { name, message } = serializeError(e);
      return {
        success: false,
        message: `${name}: ${message}`,
      };
    }
  };
};

export const sendEmailjsSqs = async (
  email: string,
  action: "reset" | "sign-up"
) => {
  return sqs
    .sendMessage({
      QueueUrl: Config.EMAILJS_SQS,
      MessageBody: JSON.stringify({
        email,
        action,
      }),
      MessageGroupId: "emailjs",
    })
    .promise()
    .then((e) => console.log(e));
};
