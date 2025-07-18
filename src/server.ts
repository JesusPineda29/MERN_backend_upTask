import express from "express";
import dotenv from "dotenv"
import cors from 'cors'
import morgan from "morgan";
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import authroutes from './routes/authroutes'
import projectRoutes from './routes/projectRoutes'


dotenv.config()
connectDB()

const app = express()
app.use(cors(corsConfig))

// Logging
app.use(morgan('dev'))

// Leer datos del formulario
app.use(express.json())

// Routes
app.use('/api/auth', authroutes)
app.use('/api/projects', projectRoutes)





export default app

