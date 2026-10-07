import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dns from 'node:dns';
import { connectionMongoDb } from './src/config/database.js';

// Priorizar resolución IPv4 en todas las conexiones de Node.js
dns.setDefaultResultOrder('ipv4first');

// Importación de rutas
import userRouter from './src/routes/user.routes.js';
import contactMessageRouter from './src/routes/contactMessage.routes.js';
import serviceRouter from './src/routes/service.routes.js';
import portafolioRouter from './src/routes/portfolio.routes.js';

const app = express();
dotenv.config();
let port = process.env.PORT || 3001;
connectionMongoDb();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Servir carpeta de archivos estáticos (respaldo local para imágenes)
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Tato Studio API server running');
});

// Registro de endpoints de la API REST
app.use('/api/users', userRouter);
app.use('/api/contact', contactMessageRouter);
app.use('/api/services', serviceRouter);
app.use('/api/portafolio', portafolioRouter);

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err);
  res.status(500).json({ message: err.message || 'Error interno del servidor' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});