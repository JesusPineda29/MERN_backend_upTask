import express from "express";
import dotenv from "dotenv"
import cors from 'cors'
import morgan from "morgan";
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import authroutes from './routes/authRoutes'
import projectRoutes from './routes/projectRoutes'


dotenv.config()
connectDB()

const app = express()

app.use(cors(corsConfig))

// Logging
app.use(morgan('dev'))

// Leer datos del formulario
app.use(express.json())


// Endpoint raíz opcional
app.get("/", (req, res) => {
  res.send("Backend funcionando!");
});



// Routes
app.use('/api/auth', authroutes)
app.use('/api/projects', projectRoutes)



// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

export default app

