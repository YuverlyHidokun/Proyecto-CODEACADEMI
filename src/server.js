// Requerir los módulos
import express from 'express'
import morgan from 'morgan'
import inscripcionprofesores from './routers/profesores_routes.js'
import inscripcionalumnos from './routers/estudiantes_routes.js'
import institucion from './routers/institucion_routes.js'


// Inicializaciones
const app = express()
app.use(morgan('dev'))

// Variables
app.set('port',process.env.port || 3000)

// Middlewares 
app.use(express.json())

// Rutas 
app.get('/',(req,res)=>{
    res.send("Server on")
})
app.use('/api/v1', inscripcionprofesores)

app.use('/api/v1', inscripcionalumnos)

app.use('/api/v1', institucion)

// Exportar la instancia de express por medio de app
export default  app