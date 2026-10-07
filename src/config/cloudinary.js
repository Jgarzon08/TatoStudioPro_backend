import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Configuración de Cloudinary
const hasValidSecret = Boolean(
  process.env.CLOUDINARY_API_SECRET &&
  !process.env.CLOUDINARY_API_SECRET.includes('*')
);

const isCloudinaryConfigured = Boolean(
  (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && hasValidSecret) ||
  (process.env.CLOUDINARY_URL && !process.env.CLOUDINARY_URL.includes('*'))
);

if (isCloudinaryConfigured) {
  if (process.env.CLOUDINARY_URL && !process.env.CLOUDINARY_URL.includes('*')) {
    cloudinary.config({
      cloudinary_url: process.env.CLOUDINARY_URL,
      secure: true,
    });
  } else {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }
  console.log('✔ Cloudinary configurado correctamente');
} else {
  console.log('ℹ Cloudinary no tiene credenciales aún o tiene asteriscos; se utilizará almacenamiento local de respaldo temporal (carpeta /uploads)');
}

/**
 * Sube una imagen a Cloudinary (o almacena localmente como respaldo)
 * @param {Buffer} buffer - Buffer del archivo en memoria
 * @param {string} originalName - Nombre original del archivo
 * @param {string} folder - Carpeta en Cloudinary
 * @returns {Promise<{ url: string, publicId?: string }>}
 */
export const uploadImage = async (buffer, originalName = 'foto.jpg', folder = 'tatostudio_portfolio') => {
  // Si Cloudinary está configurado, sube a la nube
  if (isCloudinaryConfigured) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
          transformation: [
            { quality: 'auto:good' },
            { fetch_format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) return reject(error);
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      );
      uploadStream.end(buffer);
    });
  }

  // Respaldo local si aún no se han colocado las claves en .env
  const uploadsDir = path.resolve('uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const ext = path.extname(originalName) || '.jpg';
  const fileName = `foto_${Date.now()}_${Math.round(Math.random() * 1e4)}${ext}`;
  const filePath = path.join(uploadsDir, fileName);

  await fs.promises.writeFile(filePath, buffer);
  return {
    url: `http://localhost:3001/uploads/${fileName}`,
    publicId: fileName,
  };
};

/**
 * Elimina una imagen de Cloudinary por su publicId
 */
export const deleteImage = async (publicId) => {
  if (isCloudinaryConfigured && publicId && !publicId.startsWith('foto_')) {
    return cloudinary.uploader.destroy(publicId);
  }
  // Si es local
  const filePath = path.resolve('uploads', publicId);
  if (fs.existsSync(filePath)) {
    await fs.promises.unlink(filePath);
  }
};

export default cloudinary;
