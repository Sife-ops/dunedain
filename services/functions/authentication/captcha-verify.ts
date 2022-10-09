import axios from "axios";
import { z } from "zod";

const eventSchema = z.object({
  uuid: z.string(),
  captcha: z.string(),
});

export const handler = async (event: any) => {
  try {
    const validated = eventSchema.parse(JSON.parse(event.body));

    const response = await axios.post(
      "https://captcha-api.akshit.me/v2/verify",
      validated
    );

    if (response.status !== 200) throw new Error("failed");

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
