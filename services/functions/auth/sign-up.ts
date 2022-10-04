import { dunedainModel } from "@dunedain/core/model";
import { z } from "zod";

export const handler = async (event: any) => {
  const eventSchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const { email, password } = eventSchema.parse(JSON.parse(event.body));

  const res = await dunedainModel.entities.UserEntity.create({
    email,
    password,
  }).go();

  console.log(res)
};
