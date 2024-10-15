import { Request } from 'express';
import multer, { Multer, MulterError } from 'multer';

const storage = multer.memoryStorage();
const fileSizeLimit = 100 * 1024 * 1024; 

const upload: Multer = multer({
  storage,
  limits: { fileSize: fileSizeLimit },
  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    callback: multer.FileFilterCallback | any,
  ) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedMimes.includes(file.mimetype)) {
      const error = new MulterError(
        'LIMIT_UNEXPECTED_FILE',
        'Invalid file type. Only JPEG, PNG, and GIF files are allowed.',
      );
      callback(error, false);
    } else {
      callback(null, true);
    }
  },
});

const uploader = (fields: { [key: string]: string }) => {
  const multerFields = Object.entries(fields).map(([name, type]) => {
    if (type === 'single') {
      return { name, maxCount: 1 };
    } else if (type === 'multiple') {
      return { name, maxCount: 10 }; // adjust maxCount as per your requirement
    }
    return { name, maxCount: 1 };
  });

  return upload.fields(multerFields);
};

export default uploader;