import Portfolio from '../models/portafolio.models.js'

// 1. READ - Obtener todas las fotografías
export const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find().sort({ createdAt: -1 })
    res.status(200).json(portfolio)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el portafolio', error: error.message })
  }
}

// 2. READ - Obtener una fotografía por ID
export const getPortfolioById = async (req, res) => {
  try {
    const { id } = req.params
    const item = await Portfolio.findById(id)

    if (!item) {
      return res.status(404).json({ message: 'Fotografía no encontrada' })
    }

    res.status(200).json(item)
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar la fotografía', error: error.message })
  }
}

// 3. CREATE - Agregar nueva fotografía
export const createPortfolioItem = async (req, res) => {
  try {
    const { title, imageUrl, category, tags, isFeatured } = req.body

    const newItem = new Portfolio({ title, imageUrl, category, tags, isFeatured })
    await newItem.save()

    res.status(201).json({ message: 'Fotografía agregada con éxito', data: newItem })
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar la fotografía', error: error.message })
  }
}

// 4. UPDATE - Actualizar información o imagen de la fotografía
export const updatePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params
    const updatedItem = await Portfolio.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

    if (!updatedItem) {
      return res.status(404).json({ message: 'Fotografía no encontrada' })
    }

    res.status(200).json({ message: 'Fotografía actualizada con éxito', data: updatedItem })
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la fotografía', error: error.message })
  }
}

// 5. DELETE - Eliminar una fotografía
export const deletePortfolioItem = async (req, res) => {
  try {
    const { id } = req.params
    const deletedItem = await Portfolio.findByIdAndDelete(id)

    if (!deletedItem) {
      return res.status(404).json({ message: 'Fotografía no encontrada' })
    }

    res.status(200).json({ message: 'Fotografía eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la fotografía', error: error.message })
  }
}