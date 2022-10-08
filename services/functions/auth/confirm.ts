import { Config } from "@serverless-stack/node/config";
import { dunedainModel } from "@dunedain/core/model";
import { verify } from "jsonwebtoken";
import { z } from "zod";

export const handler = async (event: any) => {
  const eventSchema = z.object({
    accessToken: z.string(),
  });

  const { accessToken } = eventSchema.parse(JSON.parse(event.body));

  try {
    const verified = verify(accessToken, Config.SECRET_ACCESS_TOKEN) as {
      email: string;
    };

    const {
      data: [user],
    } = await dunedainModel.entities.UserEntity.query
      .email({
        email: verified.email,
      })
      .go();

    await dunedainModel.entities.UserEntity.update({
      userId: user.userId,
      email: user.email,
    })
      .set({
        confirmed: true,
      })
      .go();

    return {
      success: true,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "something bad happened", // todo: yikes
    };
  }
};
