import type { Request, Response } from "express"
import Project from "../models/Project"


export class ProjectController {

    static createProject = async (req: Request, res: Response) => {

        const project = new Project(req.body)

        try {
            await project.save()
            res.send('proyecto creado correctamente')
        } catch (error) {
            console.log(error)
        }
    }

    
    static getAllProject = async (req: Request, res: Response) => {
        try {
            const Projects = await Project.find({})
            res.json(Projects)
        } catch (error) {
            console.log(error)
        }

        res.send('Todos los proyectos')
    }

}