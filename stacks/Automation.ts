// import { Auth } from "./Auth";
import { Database } from "./Database";
import { StackContext, use, Function } from "@serverless-stack/resources";

export function Automation({ stack }: StackContext) {

  // const auth = use(Auth);
  const db = use(Database);

  /*
   * todo: read users from cognito
   */

  const mockData = new Function(stack, 'mock-data', {
    handler: 'functions/automation/mock-data.handler',
    permissions: [db.table],
    config: [db.TABLE_NAME]
  });

  // stack.addOutputs({
  //   MOCK_: mockData.functionArn,
  // });

}
