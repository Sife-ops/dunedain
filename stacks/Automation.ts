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
    config: [db.TABLE_NAME],
  });

  const importJsonBucket = new Bucket(stack, "import-json-bucket");

  const BUCKET_NAME = new Config.Parameter(stack, "BUCKET_NAME", {
    value: importJsonBucket.bucketName,
  });

  const importJsonLambda = new Function(stack, "import-json-lambda", {
    handler: "functions/automation/import-json.handler",
    config: [db.TABLE_NAME, BUCKET_NAME],
    permissions: [importJsonBucket, db.table],
  });

  const migrationLambda = new Function(stack, "migration-lambda", {
    handler: "functions/automation/migration/index.handler",
    config: [db.TABLE_NAME],
    permissions: [db.table],
  });

  const fetchFaviconSqs = new Queue(stack, "fetch-favicon-sqs", {
    consumer: {
      function: {
        handler: "functions/automation/fetch-favicon.handler",
        config: [db.TABLE_NAME],
        permissions: [db.table],
      },
    },
  });

  const FAVICON_SQS = new Config.Parameter(stack, "FAVICON_SQS", {
    value: fetchFaviconSqs.queueUrl,
  });

  const updateFaviconsLambda = new Function(stack, "update-favicons-lambda", {
    handler: "functions/automation/update-favicons.handler",
    config: [FAVICON_SQS],
    permissions: [fetchFaviconSqs],
  });

  return {
    fetchFaviconSqs,
    FAVICON_SQS,
  };
}
