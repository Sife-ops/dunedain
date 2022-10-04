import bcrypt from "bcryptjs";
import { dunedainModel } from "@dunedain/core/model";
import { z } from "zod";

export const handler = async (event: any) => {
  const eventSchema = z.object({
    email: z.string(),
    password: z.string(),
  });

  const { email, password } = eventSchema.parse(JSON.parse(event.body));

  const { data: found } = await dunedainModel.entities.UserEntity.query
    .email({ email })
    .go();

  if (found.length > 0) {
    throw new Error("email already in use");
  }

  const hash = bcrypt.hashSync(password, 8);

  const res = await dunedainModel.entities.UserEntity.create({
    email,
    password: hash,
  }).go();

  console.log(res);
};
