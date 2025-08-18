
import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    // Creamos la lista de dominios permitidos
    const whitelist = [process.env.FRONTEND_URL];

    // Permitir requests sin origin (Postman, Node o pruebas locales)
    if (process.argv[2] === '--api') {
      whitelist.push(undefined);
    }

    // Validar el origin de la petición
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Error de CORS'));
    }
  }
};
