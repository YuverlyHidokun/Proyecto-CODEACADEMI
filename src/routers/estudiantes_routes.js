import {Router} from 'express'
import { getAllEstudiantes, getEstudiantesByIdController, updateEstudiante, deleteEstudiantesController, registerEstudiantesController, loginEstudiantesController } from '../controllers/estudiantes_controller.js'
import { verifytoken } from "../middlewares/auth.js";


const router = Router()

router.get('/estudiantes', verifytoken ,getAllEstudiantes)

router.get('/estudiantes/:id',verifytoken,getEstudiantesByIdController)

router.put('/estudiantes/:id',verifytoken, updateEstudiante)

router.post('/estudiantes/register', registerEstudiantesController)

router.post('/estudiantes/login', loginEstudiantesController)

router.delete('/estudiantes/:id',verifytoken,deleteEstudiantesController)

export default router