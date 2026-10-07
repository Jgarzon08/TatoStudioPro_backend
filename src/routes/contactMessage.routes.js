import { Router } from 'express'
import { 
  createMessage, 
  getMessages, 
  getMessageById, 
  updateMessageStatus, 
  deleteMessage 
} from '../controllers/contactMessage.controller.js'
import { verifyToken, checkRole } from '../middlewares/auth.middleware.js'

const contactMessageRouter = Router()

// Ruta Pública (Formulario web)
contactMessageRouter.post('/', createMessage)

// Rutas Protegidas (CMS)
contactMessageRouter.get('/', verifyToken, checkRole(['admin', 'user']), getMessages)
contactMessageRouter.get('/:id', verifyToken, checkRole(['admin', 'user']), getMessageById)
contactMessageRouter.put('/:id', verifyToken, checkRole(['admin', 'user']), updateMessageStatus)
contactMessageRouter.delete('/:id', verifyToken, checkRole(['admin']), deleteMessage) // Solo Admin puede eliminar mensajes

export default contactMessageRouter