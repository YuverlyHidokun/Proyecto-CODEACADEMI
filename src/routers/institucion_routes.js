//importar el modulo route de express
import { Router } from "express";
import { getAllInstitucion} from "../controllers/institucion_controller.js";

//crear la instanciaa de router
const router = Router()

//GET
//Crear la ruta y la invocacion del controlador
router.get('/institucion', getAllInstitucion)

//exportar la variable router
export default router