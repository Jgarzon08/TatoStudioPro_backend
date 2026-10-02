import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import { connectionMongoDb } from './src/config/database.js';

// Importación de rutas
import userRouter from './src/routes/user.routes.js';
import contactMessageRouter from './src/routes/contactMessage.routes.js';
import serviceRouter from './src/routes/service.routes.js';
import portafolioRouter from './src/routes/portfolio.routes.js';


const app = express()
dotenv.config();
let port = process.env.PORT;
connectionMongoDb();

// Middlewares globales
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('server running')
})

// Registro de endpoints de la API REST
app.use('/api/users', userRouter)
app.use('/api/contact', contactMessageRouter)
app.use('/api/services', serviceRouter)
app.use('/api/portfolio', portafolioRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})