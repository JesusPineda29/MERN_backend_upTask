import type { Request, Response } from 'express';
import User from '../models/User';
import { chackPaswword, hashPassword } from '../utils/auth';
import Token from '../models/Token';
import { generateToken } from '../utils/token';
import { AuthEmail } from '../emails/AuthEmail';

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

            // Hash Password
            user.password = await hashPassword(password);

            // Generar Token
            const token = new Token()
            token.token = generateToken()
            token.user = user.id

            // enviar el email
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token
            })

            // almacenar en la base de datos
            await Promise.allSettled([user.save(), token.save()])

            res.status(201).send('Cuenta creada, revisa tu email para confirmarla');
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
            return; // <- solo este return está bien (evita seguir ejecutando)
        }
    };


    static confirmAccount = async (req: Request, res: Response): Promise<void> => {
        try {
            const { token } = req.body

            const tokenExist = await Token.findOne({ token })
            if (!tokenExist) {
                const error = new Error('Token no válido')
                res.status(404).json({ error: error.message });
                return;
            }

            const user = await User.findById(tokenExist.user)
            user.confirmed = true

            await Promise.allSettled([user.save(), tokenExist.deleteOne()])
            res.send('Cuenta confirmada correctamente')

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
            return; // <- solo este return está bien (evita seguir ejecutando)
        }
    }



    static login = async (req: Request, res: Response): Promise<void> => {
        try {
            // revisar si un usuario existe
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                const error = new Error('Usuario no encontrado')
                res.status(404).json({ error: error.message });
                return;
            }

            if (!user.confirmed) {
                const token = new Token()
                token.user = user.id
                token.token = generateToken()
                await token.save()

                // enviar el email
                AuthEmail.sendConfirmationEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token
                })

                const error = new Error('La cuenta no ha sido confirmada, hemos enviado un e-mail de confirmación')
                res.status(401).json({ error: error.message });
                return;
            }

            // Revisar password
            const isPasswordCorrect = await chackPaswword(password, user.password)
            if (!isPasswordCorrect) {

                const error = new Error('Password incorecto')
                res.status(401).json({ error: error.message });
                return;
            }
            res.send('Autenticado...')


        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
            return; // <- solo este return está bien (evita seguir ejecutando)
        }
    }


    static requestConfirmationCode = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email } = req.body;

            // Usuario existe
            const user = await User.findOne({ email });
            if (!user) {
                res.status(404).json({ error: 'El usuario no está registrado' });
                return; // <- solo este return está bien (evita seguir ejecutando)
            }

            if (user.confirmed) {
                res.status(403).json({ error: 'El usuario ya está confirmado' });
                return; // <- solo este return está bien (evita seguir ejecutando)
            }

            // Generar Token
            const token = new Token()
            token.token = generateToken()
            token.user = user.id

            // enviar el email
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token
            })


            // almacenar en la base de datos
            await Promise.allSettled([user.save(), token.save()])
            res.status(201).send('Se envió un nuevo token, revisa tu email para confirmarlo');
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
            return; // <- solo este return está bien (evita seguir ejecutando)
        }
    };




    static forgotPassword = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email } = req.body;

            // Usuario existe
            const user = await User.findOne({ email });
            if (!user) {
                res.status(404).json({ error: 'El usuario no está registrado' });
                return;
            }


            // Generar Token
            const token = new Token()
            token.token = generateToken()
            token.user = user.id
            await token.save()


            // enviar el email
            AuthEmail.sendPasswordResetToken({
                email: user.email,
                name: user.name,
                token: token.token
            })


            res.status(201).send('Revisa tu email para restablecer la contraseña.');
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
            return; // <- solo este return está bien (evita seguir ejecutando)
        }
    };



    static validateToken = async (req: Request, res: Response): Promise<void> => {
        try {
            const { token } = req.body

            const tokenExist = await Token.findOne({ token })
            if (!tokenExist) {
                const error = new Error('Token no válido')
                res.status(404).json({ error: error.message });
                return;
            }

            res.send('Token válido, Define tu nuevo password')

        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
            return; // <- solo este return está bien (evita seguir ejecutando)
        }
    }


        static updatePasswordWithToken = async (req: Request, res: Response): Promise<void> => {
        try {
            const { token } = req.params
            const {password} = req.body

            const tokenExist = await Token.findOne({ token })
            if (!tokenExist) {
                const error = new Error('Token no válido')
                res.status(404).json({ error: error.message });
                return;
            }

            const  user = await User.findById(tokenExist.user)
            user.password = await hashPassword(password)

            await Promise.allSettled([user.save(), tokenExist.deleteOne()])

            res.send('El password se modifico correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
            return; // <- solo este return está bien (evita seguir ejecutando)
        }
    }


}


