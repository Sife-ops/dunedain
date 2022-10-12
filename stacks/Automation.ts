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

  /**
   * favicon
   */

  const faviconSqs = new Queue(stack, "favicon-sqs", {
    consumer: {
      function: {
        handler: "functions/external/favicon.handler",
        config: [db.tableName],
        permissions: [db.table],
      },
    },
    cdk: {
      queue: {
        contentBasedDeduplication: true,
        fifo: true,
      },
    },
  });

  const faviconSqsUrl = new Config.Parameter(stack, "FAVICON_SQS", {
    value: faviconSqs.queueUrl,
  });

  // new Function(stack, "update-favicons-lambda", {
  //   handler: "functions/automation/update-favicons.handler",
  //   config: [db.tableName, FAVICON_SQS],
  //   permissions: [db.table, faviconSqs],
  // });

  /**
   * import/export json
   */

  const exportJsonBucket = new Bucket(stack, "export-json-bucket");

  const exportJsonBucketName = new Config.Parameter(
    stack,
    "EXPORT_JSON_BUCKET_NAME",
    {
      value: exportJsonBucket.bucketName,
    }
  );

  new Function(stack, "export-json-lambda", {
    handler: "functions/automation/export-json.handler",
    config: [db.tableName, exportJsonBucketName],
    permissions: [exportJsonBucket, db.table],
  });

  new Function(stack, "import-json-lambda", {
    handler: "functions/automation/import-json.handler",
    config: [db.tableName, exportJsonBucketName],
    permissions: [exportJsonBucket, db.table],
  });

  /**
   * migration
   */

  new Function(stack, "migration-lambda", {
    handler: "functions/automation/migration/index.handler",
    config: [db.tableName],
    permissions: [db.table],
  });

  /**
   * mock data
   */

  new Function(stack, "mock-data-lambda", {
    handler: "functions/automation/mock-data.handler",
    permissions: [db.table],
    config: [db.tableName],
  });

  return {
    faviconSqs,
    faviconSqsUrl,
  };
}
