import type { Request, Response } from 'express'
import Task from '../models/task'

export class TaskController {

    static createTask = async (req: Request, res: Response) => {

        try {
            const task = new Task(req.body)
            task.project = req.project.id
            req.project.tasks.push(task.id)
            await Promise.allSettled([task.save(), req.project.save()])
            res.send('Tarea creada correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }



    static getProjectTask = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ project: req.project.id }).populate('project')
            res.json(tasks)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }




    static getTaskById = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params
            const task = await Task.findById(taskId)
            if (!task) {
                res.status(404).json({ error: 'Tarea no encontrado' });
                return;
            }
            if (task.project.toString() !== req.project.id) {
                res.status(400).json({ error: 'Acción no valida' });
                return;
            }
            res.json(task)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }



    static updateTask = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params
            const task = await Task.findById(taskId)
            if (!task) {
                res.status(404).json({ error: 'Tarea no encontrado' });
                return;
            }
            if (task.project.toString() !== req.project.id) {
                res.status(400).json({ error: 'Acción no valida' });
                return;
            }
            task.name = req.body.name
            task.description = req.body.description
            await task.save()
            res.send("Tarea Actualizada Correctamente")
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }


    static deleteTask = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params
            const task = await Task.findById(taskId)
            if (!task) {
                res.status(404).json({ error: 'Tarea no encontrado' });
                return;
            }
            req.project.tasks = req.project.tasks.filter(id => id.toString() !== taskId)
            await Promise.allSettled([task.deleteOne(), req.project.save()])
            res.send("Tarea Eliminada Correctamente")
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }


    static updateStatus = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params


            const task = await Task.findById(taskId)
            if (!task) {
                res.status(404).json({ error: 'Tarea no encontrada' });
                return;
            }
            const { status } = req.body
            task.status = status
            await task.save()
            res.send('Tarea actualizada')


        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }


}
