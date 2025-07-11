import type { Request, Response } from 'express';
import User from '../models/User';
import { hashPassword } from '../utils/auth';

export class AuthController {
  static createAccount = async (req: Request, res: Response): Promise<void> => {
    try {
      const { password, email } = req.body;

      // Prevenir duplicados
      const userExist = await User.findOne({ email });
      if (userExist) {
        res.status(409).json({ error: 'El usuario ya está registrado' });
        return; // <- solo este return está bien (evita seguir ejecutando)
      }

      // Crear usuario
      const user = new User(req.body);
      user.password = await hashPassword(password);
      await user.save();

      res.status(201).send('Cuenta creada, revisa tu email para confirmarla');
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error' });
    }
  };
}
