import multer from 'multer';

// Almacenamos los archivos en memoria (Buffer) para subirlos directo a Cloudinary sin llenar el disco local
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Formato no válido. Solo se admiten imágenes JPG, PNG y WEBP.'), false);
  }
};

export const uploadImagesMiddleware = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB por archivo
    files: 10, // Máximo 10 fotografías simultáneas
  },
  fileFilter,
}).any();
