import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";

const router = Router()

router.post('/', ProjectController.createProject)
router.get('/', ProjectController.getAllProject)

export default router
