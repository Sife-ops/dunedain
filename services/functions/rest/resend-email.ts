import AWS from "aws-sdk";
import { sendEmailjsSqs, wrapError } from "./common";
import { dunedainModel } from "@dunedain/core/model";
import { z } from "zod";

const sqs = new AWS.SQS();

const eventSchema = z.object({
  email: z.string(),
});

const resendEmail = async (event: any) => {
  const { email } = eventSchema.parse(JSON.parse(event.body));

  const { data: found } = await dunedainModel.entities.UserEntity.query
    .email({ email })
    .go();
  if (found.length < 1) throw new Error("account does not yet exist");

  const [user] = found;
  if (user.confirmed) throw new Error("account already confirmed");

  await sendEmailjsSqs(email, "sign-up");

  return {
    success: true,
  };
};

export const handler = wrapError(resendEmail);
