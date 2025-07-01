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




    static getProjectById = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            const project = await Project.findById(id);

            if (!project) {
                res.status(404).json({ error: 'Proyecto no encontrado' });
                return; // ✅ este return evita que siga la ejecución
            }

            res.json(project); // ✅ solo una respuesta
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error del servidor' }); // ✅ respuesta si falla
        }
    };

}

