import ContactMessage from '../models/contactMessage.models.js'
import { sendContactNotification } from '../config/mailer.js'

// 1. CREATE - Guardar mensaje enviado desde la web (Público)
export const createMessage = async (req, res) => {
  try {
    const { fullName, email, eventType, message } = req.body

    if (!fullName || !email || !eventType || !message) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' })
    }

    const newMessage = new ContactMessage({ fullName, email, eventType, message })
    await newMessage.save()

    // Enviar correo de notificación a carollmolina1993@gmail.com con CC a julian.garzon08@gmail.com
    sendContactNotification({ fullName, email, eventType, message }).catch((err) => {
      console.error('Aviso: no se pudo enviar el correo de notificación:', err.message)
    })

    res.status(201).json({ message: 'Mensaje enviado con éxito', data: newMessage })
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar el mensaje', error: error.message })
  }
}

// 2. READ - Obtener todos los mensajes (CMS)
export const getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 })
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los mensajes', error: error.message })
  }
}

// 3. READ - Obtener un mensaje específico por ID
export const getMessageById = async (req, res) => {
  try {
    const { id } = req.params
    const message = await ContactMessage.findById(id)

    if (!message) {
      return res.status(404).json({ message: 'Mensaje no encontrado' })
    }

    res.status(200).json(message)
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el mensaje', error: error.message })
  }
}

// 4. UPDATE - Cambiar estado del mensaje ('pendiente', 'leido', 'respondido')
export const updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const updatedMessage = await ContactMessage.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true, runValidators: true }
    )

    if (!updatedMessage) {
      return res.status(404).json({ message: 'Mensaje no encontrado' })
    }

    res.status(200).json({ message: 'Estado del mensaje actualizado', data: updatedMessage })
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el estado del mensaje', error: error.message })
  }
}

// 5. DELETE - Eliminar un mensaje del sistema
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params
    const deletedMessage = await ContactMessage.findByIdAndDelete(id)

    if (!deletedMessage) {
      return res.status(404).json({ message: 'Mensaje no encontrado' })
    }

    res.status(200).json({ message: 'Mensaje eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el mensaje', error: error.message })
  }
}