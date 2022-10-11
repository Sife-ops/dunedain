import axios from "axios";
import { wrapError } from "./common";
import { z } from "zod";

const eventSchema = z.object({
  uuid: z.string(),
  captcha: z.string(),
});

const captchaVerify = async (event: any) => {
  const validated = eventSchema.parse(JSON.parse(event.body));
  await axios.post("https://captcha-api.akshit.me/v2/verify", validated);

  return {
    success: true,
  };
};

export const handler = wrapError(captchaVerify);
