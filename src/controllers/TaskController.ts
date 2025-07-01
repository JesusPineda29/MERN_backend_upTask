import type { Request, Response } from 'express'
import Project from '../models/Project'
import Task from '../models/task'

export class TaskController {

    static createTask = async (req: Request, res: Response) => {

        const { projectId } = req.params
        const project = await Project.findById(projectId)
        if (!project) {
            res.status(404).json({ error: 'Proyecto no encontrado' });
            return;
        }

        try {
            const task = new Task(req.body)
            task.project = project.id
            project.tasks.push(task.id)
            await task.save()
            await project.save()
            res.send('Tarea creada correctamente')
        } catch (error) {
            console.log(error)
        }
    }
}