import express from 'express'
import { 
  registerUser, 
  loginUser, 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} from '../controllers/user.controller.js'
import { verifyToken, checkRole } from '../middlewares/auth.middleware.js'

const userRouter = express.Router()

// Autenticación (Pública)
userRouter.post('/login', loginUser)

// Endpoints del CRUD de Usuarios (Protegidos)
userRouter.post('/register', verifyToken, checkRole(['admin']), registerUser) // C
userRouter.get('/', verifyToken, checkRole(['admin', 'user']), getUsers)      // R (Todos)
userRouter.get('/:id', verifyToken, checkRole(['admin', 'user']), getUserById) // R (Uno)
userRouter.put('/:id', verifyToken, checkRole(['admin']), updateUser)          // U
userRouter.delete('/:id', verifyToken, checkRole(['admin']), deleteUser)       // D

export default userRouter