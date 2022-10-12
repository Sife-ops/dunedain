import bcrypt from "bcryptjs";
import { Config } from "@serverless-stack/node/config";
import { dunedainModel } from "@dunedain/core/model";
import { sign } from "jsonwebtoken";
import { wrapError } from "./common";
import { z } from "zod";

const eventSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const signIn = async (event: any) => {
  const { email, password } = eventSchema.parse(JSON.parse(event.body));

  const { data: found } = await dunedainModel.entities.UserEntity.query
    .email({ email })
    .go();
  if (found.length < 1) throw new Error("user not found");

  const [user] = found;
  const compared = bcrypt.compareSync(password, user.password);
  if (!compared) throw new Error("incorrect password");
  if (!user.confirmed) throw new Error("unconfirmed");

  const accessToken = sign(
    { email, userId: user.userId },
    Config.SECRET_ACCESS_TOKEN,
    {
      expiresIn: "1m",
    }
  );

  return {
    success: true,
    accessToken,
  };
};

export const handler = wrapError(signIn);
