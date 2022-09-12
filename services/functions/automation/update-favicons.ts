import AWS from "aws-sdk";
import { Config } from "@serverless-stack/node/config";
import { dunedainModel } from "@dunedain/core/model";

const sqs = new AWS.SQS();

export const handler = async () => {
  const bookmarks = await dunedainModel.entities.BookmarkEntity.scan.go();

  for (const bookmark of bookmarks) {
    await sqs
      .sendMessage({
        QueueUrl: Config.FAVICON_SQS!,
        MessageBody: JSON.stringify(bookmark),
      })
      .promise();
  }
};
