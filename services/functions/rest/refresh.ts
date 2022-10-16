import axios from "axios";
import { Config } from "@serverless-stack/node/config";
import { z } from "zod";

const { STAGE } = process.env;

const eventSchema = z.object({
  serviceId: z.string(),
  refreshToken: z.string(),
});

// todo: api password?
export const handler = async (event: any) => {
  try {
    const validated = eventSchema.parse(JSON.parse(event.body));

    const url = `${Config.MANDOS_URL}/refresh`;
    const res = await axios.post(url, {
      serviceId: STAGE === "prod" ? "dunedain" : "local",
      refreshToken: validated.refreshToken,
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
