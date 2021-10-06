import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { FileUpload } from 'graphql-upload';
import { v4 as uuid } from 'uuid';
import s3 from '../config/aws-s3';

export const uploadFile = async (file: FileUpload): Promise<string> => {
  const params: PutObjectRequest = {
    Bucket: process.env.AWS_BUCKET as string,
    Body: file.createReadStream(),
    ContentType: file.mimetype,
    Key: `${uuid()}-${file.filename}`,
  };

  return new Promise<string>((res) => {
    s3.upload(params, (err, data) => {
      if (err) {
        throw new Error(err.message);
      }
      res(data.Key);
    });
  });
};

export const deleteFile = (key: string): Promise<boolean> => {
  const params: PutObjectRequest = {
    Bucket: process.env.AWS_BUCKET as string,
    Key: key,
  };

  return new Promise<boolean>((res) => {
    s3.deleteObject(params, (err) => {
      if (err) {
        throw new Error(err.message);
      }
      res(true);
    });
  });
};
