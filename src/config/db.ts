import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config(); // Asegura que se carguen las variables de entorno

export const connectDB = async () => {
  const dbUrl = process.env.DATA_BASE_URL;

  if (!dbUrl) {
    console.log(colors.red.bold("❌ ERROR: La variable de entorno DATA_BASE_URL no está definida"));
    return; // No intentamos conectar si no hay URL
  }

  try {
    const connection = await mongoose.connect(dbUrl);
    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(colors.bgCyan.bold(`✅ mongoDB Conectado en: ${url}`));
  } catch (error: any) {
    console.log(colors.red.bold("❌ Error al conectar a MongoDB"));
    console.error(error); // Muestra el error completo de conexión
    // NOTA: No usamos exit(1) para que el servidor no se cierre automáticamente
  }
};
