import AWS from "aws-sdk";
import { Config } from "@serverless-stack/node/config";
import { dunedainModel } from "@dunedain/core/model";

const S3 = new AWS.S3();

export const handler = async ({ userId }: { userId: string }) => {
  const { data } = await dunedainModel.collections.user({ userId }).go();

  const res = await S3.putObject({
    Bucket: Config.BUCKET_NAME,
    Key: new Date().toISOString(),
    Body: JSON.stringify(data),
    ContentType: "application/json",
  }).promise();

  console.log(res);
  return;
};
