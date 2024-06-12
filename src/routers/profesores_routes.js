import {Router} from 'express'
import { getAllProfesores, getProfesoresbyID, updateProfesores, deleteProfesoresController, registerPofresoresController, loginProfesoresController} from "../controllers/profesores_controller.js";
import { verifytoken } from "../middlewares/auth.js";

const router = Router()

router.get('/profesores', verifytoken,getAllProfesores)
router.get('/profesores/:id', verifytoken,getProfesoresbyID)

router.post('/profesores/register', registerPofresoresController)
router.post('/profesores/login',loginProfesoresController)


router.put('/profesores/:id',verifytoken,updateProfesores)
router.delete('/profesores/:id',verifytoken, deleteProfesoresController)

export default router