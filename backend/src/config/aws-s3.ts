import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
  region: process.env.AWS_REGION as string,
});

export default s3;
