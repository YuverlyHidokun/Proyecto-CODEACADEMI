const institucionModel = {
    async getAllInstitucion(){
        const peticion = await fetch('http://localhost:4000/institucion')
        const institucion = await peticion.json()
        //:punto 2
        return institucion
     },
}
export default institucionModel