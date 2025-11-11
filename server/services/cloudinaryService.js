import cloudinary from '../config/cloudinary.js';

const ensureCloudinary = () => {
  if (!cloudinary?.uploader) {
    const error = new Error('Cloudinary is not configured. Please set CLOUDINARY_* environment variables.');
    error.status = 503;
    throw error;
  }
  return cloudinary;
};

const uploadBuffer = (buffer, options) =>
  new Promise((resolve, reject) => {
    const cld = ensureCloudinary();

    const stream = cld.uploader.upload_stream(options, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });

    stream.end(buffer);
  });

export const removeBackground = async (buffer) => {
  const result = await uploadBuffer(buffer, {
    folder: 'quickai/background-removal',
    format: 'png',
    transformation: [{ effect: 'background_removal' }],
  });

  return result.secure_url;
};

export const removeObject = async (buffer, prompt) => {
  const result = await uploadBuffer(buffer, {
    folder: 'quickai/object-removal',
    format: 'png',
    transformation: [
      {
        effect: `gen_remove:${prompt}`,
      },
    ],
  });

  return result.secure_url;
};

