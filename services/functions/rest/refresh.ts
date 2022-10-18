import axios from "axios";
import { Config } from "@serverless-stack/node/config";
import { z } from "zod";

const eventSchema = z.object({
  refreshToken: z.string(),
});

// todo: api password?
export const handler = async (event: any) => {
  try {
    const { refreshToken } = eventSchema.parse(JSON.parse(event.body));

    const url = `${Config.MANDOS_API_URL}/refresh`;
    const res = await axios.post(url, {
      refreshToken,
    });

    return res.data;
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: e,
    };
  }
};
