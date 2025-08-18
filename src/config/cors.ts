import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    // Lista de dominios permitidos
    const whitelist = [
      process.env.FRONTEND_URL, // tu dominio en Netlify
      "http://localhost:5173",   // frontend local en Vite
    ];

    // Permitir requests sin origin (Postman, Node, etc.)
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS Error: origin ${origin} no permitido`));
    }
  },
  credentials: true, // permite enviar cookies o headers de auth
  optionsSuccessStatus: 200, // para que OPTIONS devuelva 200
};
