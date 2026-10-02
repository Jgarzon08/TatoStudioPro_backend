import { Router } from 'express'
import { 
  getServices, 
  getServiceById, 
  createService, 
  updateService, 
  deleteService 
} from '../controllers/service.controller.js'
import { verifyToken, checkRole } from '../middlewares/auth.middleware.js'

const serviceRouter = Router()

// Rutas Públicas
serviceRouter.get('/', getServices)
serviceRouter.get('/:id', getServiceById)

// Rutas Protegidas (CMS)
serviceRouter.post('/', verifyToken, checkRole(['admin', 'user']), createService)      // Admin y Analista/User
serviceRouter.put('/:id', verifyToken, checkRole(['admin', 'user']), updateService)    // Admin y Analista/User
serviceRouter.delete('/:id', verifyToken, checkRole(['admin']), deleteService)          // Solo Admin

export default serviceRouter