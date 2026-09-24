import express from 'express'
import dotenv from 'dotenv'
import { connectionMongoDb } from './src/config/database.js';



const app = express()
dotenv.config();
let port = process.env.PORT;
connectionMongoDb();


app.get('/', (req, res) => {
  res.send('server running')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})