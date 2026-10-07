import { Router } from 'express';
import {
  getPortfolio,
  getPortfolioCategories,
  getPortfolioById,
  uploadAndCreatePortfolioItem,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} from '../controllers/portfolio.controller.js';
import { verifyToken, checkRole } from '../middlewares/auth.middleware.js';
import { uploadImagesMiddleware } from '../middlewares/upload.middleware.js';

const portafolioRouter = Router();

// Rutas Públicas
portafolioRouter.get('/', getPortfolio);
portafolioRouter.get('/categories', getPortfolioCategories);
portafolioRouter.get('/:id', getPortfolioById);

// Rutas Protegidas (CMS - Requieren Token de Admin/User)
portafolioRouter.post(
  '/upload',
  verifyToken,
  checkRole(['admin', 'user']),
  uploadImagesMiddleware,
  uploadAndCreatePortfolioItem
);

portafolioRouter.post('/', verifyToken, checkRole(['admin', 'user']), createPortfolioItem);
portafolioRouter.put('/:id', verifyToken, checkRole(['admin', 'user']), updatePortfolioItem);
portafolioRouter.delete('/:id', verifyToken, checkRole(['admin']), deletePortfolioItem);

export default portafolioRouter;