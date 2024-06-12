import estudiantesModel from "../models/estudiantes.js";
import { v4 as uuidv4 }  from 'uuid'
import bcrypt from "bcrypt"
import { json } from "express"
import { createToken } from "../middlewares/auth.js"
import { token } from "morgan"

const getAllEstudiantes = async (req, res) =>{
    try{
        //invocar el metodo del modelo
        const estudiantes = await estudiantesModel.getAllEstudiantes()
        //mandar la respuesta al frontend
        res.status(200).json(estudiantes)
    }catch(error){
        res.status(500).json({msg: error.message})

    }
}
const getEstudiantesByIdController=async(req,res)=>{
    try{
        const {id}=req.params
        const estudiante = await estudiantesModel.getEstudiantesByIdmodel(id)
        const status = estudiante.error ? 404 : 200
        res.status(status).json(estudiante)
    }catch(error){
        res.status(500).json(error)
    }
}
const deleteEstudiantesController = async (req, res) =>{
    try{
        const {id}= req.params
        console.log(id)
        const estudiante = await estudiantesModel.deleteEstudiantesByIdmodel(id)
        const status = estudiante.error ? 404 : 200
        res.status(status).json(estudiante)
    }catch(error){
        res.status(500).json({msg: error.message})
    }
}

const updateEstudiante = async(req, res)=> {
    const {id} = req.params
    try {
        const estudiante = await estudiantesModel.updateEstudiantemodel(id,req.body)
        const status = estudiante.error ? 404 : 200
        res.status(status).json(estudiante)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
const registerEstudiantesController = async(req, res)=> {
    const { password, ...otherDataUser } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const userData = {
        id: uuidv4(),
        password: hashedPassword,
        ...otherDataUser
    }
    try {
        const user = await estudiantesModel.registerEstudiante(userData)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ msg: error.message})
    }
}

const loginEstudiantesController = async(req,res) =>{
    const {username,password} = req.body
    try {
        const user = await estudiantesModel.loginEstudiantesModel(username,password)
        let token = createToken(user)
        delete user.password
        res.status(200).json({user,token})   
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
export{
    getAllEstudiantes,
    getEstudiantesByIdController,
    updateEstudiante,
    deleteEstudiantesController,
    registerEstudiantesController,
    loginEstudiantesController
}

