import Service from '../models/service.models.js'

// 1. READ - Obtener todos los servicios activos (Público)
export const getServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ createdAt: -1 })
    res.status(200).json(services)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los servicios', error: error.message })
  }
}

// 2. READ - Obtener un servicio por ID
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params
    const service = await Service.findById(id)

    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' })
    }

    res.status(200).json(service)
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el servicio', error: error.message })
  }
}

// 3. CREATE - Crear un nuevo servicio
export const createService = async (req, res) => {
  try {
    const { title, category, description, price, features } = req.body

    const newService = new Service({ title, category, description, price, features })
    await newService.save()

    res.status(201).json({ message: 'Servicio creado con éxito', data: newService })
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el servicio', error: error.message })
  }
}

// 4. UPDATE - Actualizar un servicio por ID
export const updateService = async (req, res) => {
  try {
    const { id } = req.params
    const updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })

    if (!updatedService) {
      return res.status(404).json({ message: 'Servicio no encontrado' })
    }

    res.status(200).json({ message: 'Servicio actualizado con éxito', data: updatedService })
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el servicio', error: error.message })
  }
}

// 5. DELETE - Eliminar un servicio por ID
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params
    const deletedService = await Service.findByIdAndDelete(id)

    if (!deletedService) {
      return res.status(404).json({ message: 'Servicio no encontrado' })
    }

    res.status(200).json({ message: 'Servicio eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el servicio', error: error.message })
  }
}