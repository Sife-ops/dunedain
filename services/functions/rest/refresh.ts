import axios from "axios";
import { z } from "zod";

const eventSchema = z.object({
  serviceId: z.string(),
  refreshToken: z.string(),
});

export const handler = async (event: any) => {
  try {
    const validated = eventSchema.parse(JSON.parse(event.body));

    const url =
      "https://eqcwibjl5l.execute-api.us-east-1.amazonaws.com/refresh";
    const res = await axios.post(url, {
      serviceId: "local",
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
