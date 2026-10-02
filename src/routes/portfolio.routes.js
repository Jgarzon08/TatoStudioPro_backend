import { Router } from 'express'
import { 
  getPortfolio, 
  getPortfolioById, 
  createPortfolioItem, 
  updatePortfolioItem, 
  deletePortfolioItem 
} from '../controllers/portfolio.controller.js'
import { verifyToken, checkRole } from '../middlewares/auth.middleware.js'

const portafolioRouter = Router()

// Rutas Públicas
portafolioRouter.get('/', getPortfolio)
portafolioRouter.get('/:id', getPortfolioById)

// Rutas Protegidas (CMS)
portafolioRouter.post('/', verifyToken, checkRole(['admin', 'user']), createPortfolioItem)      // Admin y Analista/User
portafolioRouter.put('/:id', verifyToken, checkRole(['admin', 'user']), updatePortfolioItem)    // Admin y Analista/User
portafolioRouter.delete('/:id', verifyToken, checkRole(['admin']), deletePortfolioItem)          // Solo Admin

export default portafolioRouter