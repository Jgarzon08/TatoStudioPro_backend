import Portfolio from '../models/portafolio.models.js';
import { uploadImage, deleteImage } from '../config/cloudinary.js';

// 1. READ - Obtener todas las fotografías
export const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find().sort({ createdAt: -1 });
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el portafolio', error: error.message });
  }
};

// 1.1 READ - Obtener lista de categorías únicas disponibles
export const getPortfolioCategories = async (req, res) => {
  try {
    const categories = await Portfolio.distinct('category');
    const defaultCats = ['wedding', 'arte', 'restaurantes'];
    const merged = Array.from(new Set([...defaultCats, ...categories.filter(Boolean)]));
    res.status(200).json(merged);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener categorías', error: error.message });
  }
};

// 2. READ - Obtener una fotografía por ID
export const getPortfolioById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Portfolio.findById(id);

    if (!item) {
      return res.status(404).json({ message: 'Fotografía no encontrada' });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error al encontrar la fotografía', error: error.message });
  }
};

// 3. CREATE CON ARCHIVO(S) - Subir hasta 10 imágenes a Cloudinary y guardar en Portafolio
export const uploadAndCreatePortfolioItem = async (req, res) => {
  try {
    const { title, category, tags, isFeatured } = req.body;

    const files = (req.files && req.files.length > 0) ? req.files : (req.file ? [req.file] : []);

    if (files.length === 0) {
      return res.status(400).json({ message: 'Debes seleccionar al menos un archivo de imagen para subir.' });
    }

    if (files.length > 10) {
      return res.status(400).json({ message: 'Puedes subir como máximo 10 fotografías al mismo tiempo.' });
    }

    if (!title || !category) {
      return res.status(400).json({ message: 'El título y la categoría son obligatorios.' });
    }

    // Procesar tags si vienen como string delimitado por comas
    let parsedTags = [];
    if (typeof tags === 'string') {
      parsedTags = tags.split(',').map((t) => t.trim()).filter(Boolean);
    } else if (Array.isArray(tags)) {
      parsedTags = tags;
    }

    const savedItems = [];

    // Subir cada archivo secuencialmente a Cloudinary/local
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uploadResult = await uploadImage(file.buffer, file.originalname, 'tatostudio_portfolio');

      const photoTitle = files.length > 1 ? `${title.trim()} (${i + 1})` : title.trim();

      const newItem = new Portfolio({
        title: photoTitle,
        imageUrl: uploadResult.url,
        publicId: uploadResult.publicId,
        category: category.trim().toLowerCase(),
        tags: parsedTags,
        isFeatured: isFeatured === 'true' || isFeatured === true,
      });

      await newItem.save();
      savedItems.push(newItem);
    }

    res.status(201).json({
      message: savedItems.length > 1
        ? `¡Se subieron y guardaron exitosamente ${savedItems.length} fotografías!`
        : 'Fotografía subida y guardada con éxito',
      count: savedItems.length,
      data: savedItems.length === 1 ? savedItems[0] : savedItems,
    });
  } catch (error) {
    console.error('Error al subir fotografía(s):', error);
    res.status(500).json({ message: 'Error al procesar la(s) fotografía(s)', error: error.message });
  }
};

// 4. CREATE MANUAL (JSON) - Agregar con URL directa
export const createPortfolioItem = async (req, res) => {
  try {
    const { title, imageUrl, category, tags, isFeatured } = req.body;

    const newItem = new Portfolio({ title, imageUrl, category, tags, isFeatured });
    await newItem.save();

    res.status(201).json({ message: 'Fotografía agregada con éxito', data: newItem });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar la fotografía', error: error.message });
  }
};

// 5. UPDATE - Actualizar información
export const updatePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Portfolio.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updatedItem) {
      return res.status(404).json({ message: 'Fotografía no encontrada' });
    }

    res.status(200).json({ message: 'Fotografía actualizada con éxito', data: updatedItem });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la fotografía', error: error.message });
  }
};

// 6. DELETE - Eliminar de MongoDB y borrar de Cloudinary
export const deletePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Portfolio.findById(id);

    if (!item) {
      return res.status(404).json({ message: 'Fotografía no encontrada' });
    }

    // Si tiene publicId asociado, borrar de Cloudinary
    if (item.publicId) {
      try {
        await deleteImage(item.publicId);
      } catch (cloudErr) {
        console.warn('Aviso: no se pudo eliminar la imagen de Cloudinary:', cloudErr.message);
      }
    }

    await Portfolio.findByIdAndDelete(id);

    res.status(200).json({ message: 'Fotografía eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la fotografía', error: error.message });
  }
};