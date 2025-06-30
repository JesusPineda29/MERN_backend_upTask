import mongoose from "mongoose";
import colors from "colors";
import { exit } from 'node:process';

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATA_BASE_URL)
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(colors.bgCyan.bold(`mongoDB Conectado en: ${url}`))
    } catch (error) {
        console.log(colors.red.bold(`Error al conectar a MongoDB`))
        exit(1)
    }
}