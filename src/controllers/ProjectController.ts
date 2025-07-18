import type { Request, Response } from "express"
import Project from "../models/Project"


export class ProjectController {


    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)

        // Asigna un manager
        project.manager = req.user.id

        try {
            await project.save()
            res.send('proyecto creado correctamente')
        } catch (error) {
            console.log(error)
        }
    }



    static getAllProject = async (req: Request, res: Response) => {
        try {
            const Projects = await Project.find({
                $or: [
                    { manager: { $in: req.user.id } }
                ]
            })
            res.json(Projects)
        } catch (error) {
            console.log(error)
        }
        res.send('Todos los proyectos')
    }



    static getProjectById = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            const project = await (await Project.findById(id)).populate('tasks')

            if (!project) {
                res.status(404).json({ error: 'Proyecto no encontrado' });
                return; // ✅ este return evita que siga la ejecución
            }
            if (project.manager.toString() !== req.user.id.toString()) {
                res.status(404).json({ error: 'Acción no válida' });
                return; // ✅ este return evita que siga la ejecución
            }
            res.json(project); // ✅ solo una respuesta
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error del servidor' }); // ✅ respuesta si falla
        }
    };



    static updateProject = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            const project = await Project.findById(id);

            if (!project) {
                res.status(404).json({ error: 'Proyecto no encontrado' });
                return;
            }

            if (project.manager.toString() !== req.user.id.toString()) {
                res.status(404).json({ error: 'Solo en Manager puede actualizar un proyecto' });
                return; // ✅ este return evita que siga la ejecución
            }
            project.clientName = req.body.clientName
            project.projectName = req.body.projectName
            project.description = req.body.description

            await project.save()
            res.send('Proyecto Actualizado')
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error del servidor' }); // ✅ respuesta si falla
        }
    };




    static deleteProject = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;

        try {
            const project = await Project.findById(id)

            if (!project) {
                res.status(404).json({ error: 'Proyecto no encontrado' });
                return;
            }

            if (project.manager.toString() !== req.user.id.toString()) {
                res.status(404).json({ error: 'Solo el Manager puede eliminar un proyecto' });
                return; // ✅ este return evita que siga la ejecución
            }

            await project.deleteOne()
            res.send('Proyecto Eliminado')

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error del servidor' }); // ✅ respuesta si falla
        }
    };

}

