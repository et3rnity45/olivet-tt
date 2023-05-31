import {
  PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { FileUpload } from 'graphql-upload';
import { v4 as uuid } from 'uuid';
import client from '../config/aws-s3';

export const uploadFile = (file: FileUpload): Promise<string> => {
  const key = `${uuid()}-${file.filename}`;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET as string,
    Body: file.createReadStream(),
    ContentType: file.mimetype,
    Key: key,
  });

  return new Promise<string>((res) => {
    client.send(command, (err) => {
      if (err) {
        throw new Error(err.message);
      }
      res(key);
    });
  });
};

export const deleteFile = (key: string): Promise<boolean> => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET as string,
    Key: key,
  });

  return new Promise<boolean>((res) => {
    client.send(command, (err) => {
      if (err) {
        throw new Error(err.message);
      }
      res(true);
    });
  });
};

export const getFiles = (): Promise<(string | undefined)[] | undefined> => {
  const command = new ListObjectsV2Command({
    Bucket: process.env.AWS_BUCKET as string,
  });

  return new Promise<(string | undefined)[] | undefined>((res) => {
    client.send(command, (err, data) => {
      if (err) {
        throw new Error(err.message);
      }
      if (data) {
        const files = data.Contents?.map((file) => file.Key);
        res(files);
      }
    });
  });
};
