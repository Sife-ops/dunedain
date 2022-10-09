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
    const { email, password } = eventSchema.parse(JSON.parse(event.body));

    const {
      data: found,
    } = await dunedainModel.entities.UserEntity.query.email({ email }).go();
    if (found.length < 1) throw new Error("User not found");

    const [user] = found;
    const compared = bcrypt.compareSync(password, user.password);
    if (!compared) throw new Error("Incorrect password");
    if (!user.confirmed) throw new Error("Unconfirmed");

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
  } catch (e) {
    console.log(e);
    return {
      success: false,
      // todo: install serialize-error
      // @ts-ignore
      message: e.message,
    };
  }
};
