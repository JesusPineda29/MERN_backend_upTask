import { Router } from "express";
import { body } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";

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

export default router




