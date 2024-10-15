import { uploadImageToCloudinary } from './cloudUploader';

type UploadedFiles = { [key: string]: string | string[] };
export const handleMulterUpload = async (
  files: any,
): Promise<UploadedFiles> => {
  const uploadedFiles: { [key: string]: any } = {};
  const uploadPromises = Object.keys(files).map(async fieldname => {
    if (files[fieldname].length === 1) {
      // Single file
      const file = files[fieldname][0];
      uploadedFiles[fieldname] = await uploadImageToCloudinary(file);
    } else {
      // Multiple files
      uploadedFiles[fieldname] = [];
      for (const file of files[fieldname]) {
        const result = await uploadImageToCloudinary(file);
        uploadedFiles[fieldname].push(result);
      }
    }
  });

  await Promise.all(uploadPromises);

  return uploadedFiles;
};