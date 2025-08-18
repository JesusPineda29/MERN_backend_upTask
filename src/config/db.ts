import mongoose from "mongoose";
import colors from "colors";
import { exit } from 'node:process';

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DATA_BASE_URL!)
    console.log("MongoDB conectado:", connection.connection.host)
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error) // <--- muestra el error real
    process.exit(1)
  }
}