import axios from "axios";
import { serializeError } from "serialize-error";
import { z } from "zod";

const eventSchema = z.object({
  uuid: z.string(),
  captcha: z.string(),
});

export const handler = async (event: any) => {
  try {
    const validated = eventSchema.parse(JSON.parse(event.body));
    await axios.post("https://captcha-api.akshit.me/v2/verify", validated);

    return {
      success: true,
    };
  } catch (e) {
    console.log(e);
    const { name, message } = serializeError(e);
    return {
      success: false,
      message: `${name}: ${message}`,
    };
  }
};
