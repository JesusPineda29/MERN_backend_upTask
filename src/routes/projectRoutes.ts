import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";

const router = Router()

router.post('/',
    body('projectName')
        .notEmpty().withMessage('El Nombre del proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El Nombre del cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripción del proyecto es Obligatorio'),
    handleInputErrors,
    ProjectController.createProject
)

router.get('/', ProjectController.getAllProject)

router.get('/:id',
    param('id').isMongoId().withMessage('ID no Válido'),
    handleInputErrors,
    ProjectController.getProjectById
)

router.put('/:id',
    param('id').isMongoId().withMessage('ID no Válido'),
    body('projectName')
        .notEmpty().withMessage('El Nombre del proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El Nombre del cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripción del proyecto es Obligatorio'),
    handleInputErrors,
    ProjectController.updateProject
)

router.delete('/:id',
    param('id').isMongoId().withMessage('ID no Válido'),
    handleInputErrors,
    ProjectController.deleteProject
)



// Routes for tasks
router.post('/:projectId/tasks',
    validateProjectExists,
    TaskController.createTask
)




export default router




