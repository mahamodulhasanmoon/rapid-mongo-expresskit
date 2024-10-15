import { v2 as cloudinary } from 'cloudinary';
import httpStatus from 'http-status';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { deleteFile } from './deleteFile';
import { CustomError } from '../../errors/CustomError';
import { cloudApiKey, cloudName, cloudSecret } from '../../config';
// import sharp from 'sharp';

cloudinary.config({
  cloud_name: cloudName,
  api_key: cloudApiKey,
  api_secret: cloudSecret,
});

const processedFile = async (file: any): Promise<string | unknown> => {
  if (!file) {
    throw new CustomError(httpStatus.NOT_ACCEPTABLE, 'File not found');
  }
  const imageBuffer = file.buffer;

  const uploadFolderPath = path.resolve(process.cwd(), 'uploads');

  if (!fs.existsSync(uploadFolderPath)) {
    fs.mkdirSync(uploadFolderPath);
  }
  const parsePath = path.parse(file.originalname);

  // const outputFileName = `${parsePath.name}-${Date.now()}.webp`;
  const outputFileName = `${parsePath.name}-${Date.now()}`;
  const outputFilePath = path.resolve(uploadFolderPath, outputFileName);

  const compressionOptions = {
    quality: 60,
  };

  const maxImageWidth = 1920;

  await sharp(imageBuffer)
    .resize({ width: maxImageWidth })
    .webp(compressionOptions)
    .toFile(outputFilePath);

  // await fs.promises.writeFile(outputFilePath, imageBuffer);

  return { outputFilePath, outputFileName };
};

export const uploadImageToCloudinary = async (file: any) => {
  // upload file

  const { outputFilePath, outputFileName }: any = await processedFile(file);
  const { secure_url } = await cloudinary.uploader.upload(outputFilePath, {
    public_id: outputFileName,
  });
  await deleteFile(outputFilePath)
  .catch((error:any) => {
    throw new CustomError(500, error.message);
  });

  return secure_url;
};