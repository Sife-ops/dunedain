import { verify } from "jsonwebtoken";

export const main = async (event: any) => {
  try {
    const authHeader = event.headers.authorization;
    const accessToken = authHeader.split(" ")[1];

    // @ts-ignore
    const { email, userId } = verify(accessToken, "todo: update secret");

    return {
      isAuthorized: true,
      context: {
        user: {
          email,
          userId,
        },
      },
    };
  } catch (e) {
    console.log(e);
  }

  return {
    isAuthorized: false,
  };
};
