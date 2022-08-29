import { StackContext, Auth as CognitoAuth } from "@serverless-stack/resources";

export function Auth({ stack }: StackContext) {
  const auth = new CognitoAuth(stack, "auth", {
    login: ["email"],
  });

  stack.addOutputs({
    USER_POOL_ID: auth.userPoolId,
    USER_POOL_CLIENT_ID: auth.userPoolClientId,
  });

  return auth;
}
