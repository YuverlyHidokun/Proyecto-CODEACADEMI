import profesoresModel from "../models/profesores.js";
import { v4 as uuidv4 }  from 'uuid'
import bcrypt from 'bcrypt'
import { json } from "express"
import { createToken } from "../middlewares/auth.js"
import { token } from "morgan"

const getAllProfesores = async (req, res) =>{
    try{
        //invocar el metodo del modelo
        const profesores = await profesoresModel.getAllProfesoresmodel()
        //mandar la respuesta al frontend
        res.status(200).json(profesores)
    }catch(error){
        res.status(500).json(error)

    }
}
const getProfesoresbyID = async (req,res)=>{
    const {id} = req.params
    try {
        const profesor = await profesoresModel.getProfesoresbyIDmodel(id)
        const status = profesor.error ? 404 : 200
        res.status(status).json(profesor)
    } catch (error) {
        res.status(500).json({ msg: error.message})
    }
}

const registerPofresoresController = async(req, res)=> {
    const { password, ...otherDataUser } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const userData = {
        id: uuidv4(),
        password: hashedPassword,
        ...otherDataUser
    }
    try {
       
        const profesor = await profesoresModel.registerProfesoresModel(userData)

        res.status(200).json(profesor)
    } catch (error) {
        res.status(500).json({ msg: error.message})

    }

}

const loginProfesoresController = async(req,res) =>{
    const {username,password} = req.body
    try {
        const profesor = await profesoresModel.loginProfesoresModel(username,password)
        let token = createToken(profesor)
        delete profesor.password
        res.status(200).json({profesor,token})
        
    } catch (error) {
        res.status(500).json({msg:error.message})
    }


}
const updateProfesores = async(req, res)=> {
    const {id} = req.params
    try {
        const profesor = await profesoresModel.updateProfesoresmodel(id,req.body)
        const status = profesor.error ? 404 : 200
        res.status(status).json(profesor)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
const deleteProfesoresController = async (req, res) =>{
    try{
        const {id}= req.params
        console.log(id)
        const profesor = await profesoresModel.deleteProfesoresByIdmodel(id)
        const status = profesor.error ? 404:200
        res.status(status).json(profesor)
    }catch(error){
        res.status(500).json({msg: error.message})
    }
}

export{
    getAllProfesores,
    getProfesoresbyID,
    updateProfesores,
    deleteProfesoresController,
    registerPofresoresController,
    loginProfesoresController
}
