import { sendEmailjsSqs } from "./common";
import { dunedainModel } from "@dunedain/core/model";
import { wrapError } from "./common";
import { z } from "zod";

const eventSchema = z.object({
  email: z.string(),
});

const resendEmail = async (event: any) => {
  const { email } = eventSchema.parse(JSON.parse(event.body));

  const { data: found } = await dunedainModel.entities.UserEntity.query
    .email({ email })
    .go();
  if (found.length < 1) throw new Error("account does not yet exist");

  await sendEmailjsSqs(email, "reset");

  return {
    success: true,
  };
};

export const handler = wrapError(resendEmail);
