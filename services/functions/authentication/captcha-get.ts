import axios from "axios";

export const handler = async () => {
  try {
    const response = await axios.get(
      "https://captcha-api.akshit.me/v2/generate"
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: JSON.stringify(e),
    };
  }
};
