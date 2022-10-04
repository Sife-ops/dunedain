import { Database } from "./Database";

import {
  Bucket,
  Config,
  Function,
  Queue,
  StackContext,
  use,
} from "@serverless-stack/resources";

export function Automation({ stack }: StackContext) {
  const db = use(Database);

  const mockDataLambda = new Function(stack, "mock-data-lambda", {
    handler: "functions/automation/mock-data.handler",
    permissions: [db.table],
    config: [db.tableName],
  });

  const exportJsonBucket = new Bucket(stack, "export-json-bucket");

  const exportJsonBucketName = new Config.Parameter(
    stack,
    "EXPORT_JSON_BUCKET_NAME",
    {
      value: exportJsonBucket.bucketName,
    }
  );

  const exportJsonLambda = new Function(stack, "export-json-lambda", {
    handler: "functions/automation/export-json.handler",
    config: [db.tableName, exportJsonBucketName],
    permissions: [exportJsonBucket, db.table],
  });

  const importJsonLambda = new Function(stack, "import-json-lambda", {
    handler: "functions/automation/import-json.handler",
    config: [db.tableName, exportJsonBucketName],
    permissions: [exportJsonBucket, db.table],
  });

  const migrationLambda = new Function(stack, "migration-lambda", {
    handler: "functions/automation/migration/index.handler",
    config: [db.tableName],
    permissions: [db.table],
  });

  const fetchFaviconSqs = new Queue(stack, "fetch-favicon-sqs", {
    consumer: {
      function: {
        handler: "functions/automation/fetch-favicon.handler",
        config: [db.tableName],
        permissions: [db.table],
      },
    },
  });

  const FAVICON_SQS = new Config.Parameter(stack, "FAVICON_SQS", {
    value: fetchFaviconSqs.queueUrl,
  });

  const updateFaviconsLambda = new Function(stack, "update-favicons-lambda", {
    handler: "functions/automation/update-favicons.handler",
    config: [db.tableName, FAVICON_SQS],
    permissions: [db.table, fetchFaviconSqs],
  });

  return {
    fetchFaviconSqs,
    FAVICON_SQS,
  };
}
