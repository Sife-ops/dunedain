import { serializeError } from "serialize-error";

export const wrapError = (handler: (event: any) => Promise<any>) => {
  return async (event: any) => {
    try {
      return await handler(event);
    } catch (e) {
      console.log(e);
      const { name, message } = serializeError(e);
      return {
        success: false,
        message: `${name}: ${message}`,
      };
    }
  };
};
