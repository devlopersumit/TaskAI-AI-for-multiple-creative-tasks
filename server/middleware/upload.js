import multer from 'multer';

const TEN_MB = 10 * 1024 * 1024;

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: TEN_MB,
  },
});

export default upload;

