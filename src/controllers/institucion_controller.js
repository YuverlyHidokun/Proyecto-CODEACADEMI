import institucionModel from "../models/institucion.js";
import { v4 as uuidv4 }  from 'uuid'


const getAllInstitucion = async (req, res) =>{
    try{
        //invocar el metodo del modelo
        const institucion = await institucionModel.getAllInstitucion()
        //mandar la respuesta al frontend
        res.status(200).json(institucion)
    }catch(error){
        res.status(500).json(error)

    }
}

export{
    getAllInstitucion
}