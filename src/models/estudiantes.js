import bcrypt from 'bcrypt'

const estudiantesModel = {
    async getAllEstudiantes(){
        const peticion = await fetch('http://localhost:4000/estudiantes')
        const estudiantes = await peticion.json()
        //:punto 2
        return estudiantes
     },

    async getEstudiantesByIdmodel(EstudianteID){
        const response = await fetch(`http://localhost:4000/estudiantes/${EstudianteID}`)
        if (!response.ok){
            return{error: "Estudiante no hay, no existe!"}
        }
        const data = await response.json()
        return data
    },

    async updateEstudiantemodel (EstudianteID,updatedEstudiante) {
        const url = `http://localhost:4000/estudiantes/${EstudianteID}`
        const response = await fetch(url)
        if (!response.ok) {
            return {error:"Estudiante no encontrado"}
        }
        else{
            const peticion = await fetch(url,{
                method:'PUT',
                body:JSON.stringify(updatedEstudiante),
                headers:{'Content-Type':'application/json'}
            })
            const data = await peticion.json()
            return data
        }
    },
    
    async deleteEstudiantesByIdmodel(EstudianteID){
        const url = `http://localhost:4000/estudiantes/${EstudianteID}`
        const response = await fetch(url)
        if(!response.ok){
            return{error:"Estudiantes no hay, no existe!"}
        }else{
            const peticion = await fetch(url, {
                method:"DELETE",
            })

            await peticion.json()
            return {msg:"Estudiante Baneado"}
        }
    },

    async registerEstudiante(newEstudiante){
        // Punto uno
        const url = 'http://localhost:4000/estudiantes'
        const peticion = await fetch(url, {
            method:"POST",
            body:JSON.stringify(newEstudiante),
            headers:{"Content-type":"aplicaton-json"}
        })
        const data = await peticion.json()
        return data
    },

    async loginEstudiantesModel(username,password){
        const response = await fetch('http://localhost:4000/estudiantes')
        const estudiantes = await response.json()
        const estudiante = estudiantes.find(estudiante=>estudiante.username===username)
        if(!estudiante){
            return {error:"Username or password invalid"}
        }
        const passwordMatch = await bcrypt.compare(password, estudiante.password)
        if (estudiante && passwordMatch){
            return estudiante
        }else{
            return {error:"Username or password invalid"}
        }
    }
}


export default estudiantesModel