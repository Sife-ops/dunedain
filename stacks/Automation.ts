import { Database } from "./Database";
import { StackContext, use, Function, Bucket, Config } from "@serverless-stack/resources";

export function Automation({ stack }: StackContext) {

  const db = use(Database);

  const mockDataLambda = new Function(stack, 'mock-data-lambda', {
    handler: 'functions/automation/mock-data.handler',
    permissions: [db.table],
    config: [db.TABLE_NAME]
  });

  const importJsonBucket = new Bucket(stack, 'import-json-bucket');

  const BUCKET_NAME = new Config.Parameter(stack, "BUCKET_NAME", {
    value: importJsonBucket.bucketName,
  })

  const importJsonLambda = new Function(stack, 'import-json-lambda', {
    handler: 'functions/automation/import-json.handler',
    config: [db.TABLE_NAME, BUCKET_NAME],
    permissions: [importJsonBucket, db.table],
  });

}
