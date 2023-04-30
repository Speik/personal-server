import { randomUUID } from 'crypto';
import { extname, join } from 'path';
import { Request as UploadRequest } from 'express';

type MulterCallback = (error: Error, filename: string) => void;

const getPublicPath = () => join(process.cwd(), 'public');

const generateFilename = (
  _: UploadRequest,
  file: Express.Multer.File,
  callback: MulterCallback,
) => {
  return callback(null, `${randomUUID()}${extname(file.originalname)}`);
};

export { getPublicPath, generateFilename };
