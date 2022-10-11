import axios from "axios";
import { wrapError } from "./common";

const captchaGet = async () => {
  const response = await axios.get("https://captcha-api.akshit.me/v2/generate");

  return {
    success: true,
    data: response.data,
  };
};

export const handler = wrapError(captchaGet);
