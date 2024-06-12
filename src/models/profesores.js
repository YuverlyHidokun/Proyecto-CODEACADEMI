import bcrypt from 'bcrypt'

const profesoresModel = {
    async getAllProfesoresmodel (){
        const peticion = await fetch('http://localhost:4000/profesores')
        const profesores = await peticion.json()
        return profesores
     },
    
    async getProfesoresbyIDmodel (ProfesorID){
        const response = await fetch(`http://localhost:4000/profesores/${ProfesorID}`);
        if (!response.ok) {
            return {error:"Profesor no encontrado"}
        }
        const data = await response.json()
        return data
    }

    , 
    async updateProfesoresmodel (ProfesorID,updatedProfesor) {
        const url = `http://localhost:4000/profesores/${ProfesorID}`
        const response = await fetch(url)
        if (!response.ok) {
            return {error:"Profesor no encontrado no encontrado"}
        }
        else{
            const peticion = await fetch(url,{
                method:'PUT',
                body:JSON.stringify(updatedProfesor),
                headers:{'Content-Type':'application/json'}
            })
            const data = await peticion.json()
            return data
        }
    }
    ,
    async deleteProfesoresByIdmodel(ProfesorID){
        const url = `http://localhost:4000/profesores/${ProfesorID}`
        const response = await fetch(url)
        if(!response.ok){
            return{error:"Profesor no hay, no existe!"}
        }else{
            const peticion = await fetch(url, {
                method: "DELETE",
            })

            await peticion.json()
            return {msg:"Profesor Baneado exitosamente!"}
        }
    },
    async registerProfesoresModel(newProfesor){
        // Punto uno
        const url = 'http://localhost:4000/profesores'
        const peticion = await fetch(url, {
            method:"POST",
            body:JSON.stringify(newProfesor),
            headers:{"Content-type":"aplicaton-json"}
        })
        const data = await peticion.json()
        return data
    }
    ,
    async loginProfesoresModel(username,password){
        const response = await fetch('http://localhost:4000/profesores')
        const profesores = await response.json()
        const profesor = profesores.find(profesor=>profesor.username===username)
        if(!profesor){
            return {error:"Username or password invalid"}
        }
        const passwordMatch = await bcrypt.compare(password, profesor.password)
        if (profesor && passwordMatch){
            return profesor
        }else{
            return {error:"Username or password invalid"}
        }
    }
}

export default profesoresModel