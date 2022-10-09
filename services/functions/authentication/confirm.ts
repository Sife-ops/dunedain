import { Config } from "@serverless-stack/node/config";
import { dunedainModel } from "@dunedain/core/model";
import { verify } from "jsonwebtoken";
import { z } from "zod";

const eventSchema = z.object({
  accessToken: z.string(),
});

export const handler = async (event: any) => {
  try {
    const { accessToken } = eventSchema.parse(JSON.parse(event.body));

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

    if (!user.confirmed) {
      await dunedainModel.entities.UserEntity.update({
        userId: user.userId,
        email: user.email,
      })
        .set({
          confirmed: true,
        })
        .go();
    }

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
