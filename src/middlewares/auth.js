import jwt from 'jsonwebtoken'

const createToken =(userInfo) =>{
    return jwt.sign (userInfo,'secret_key',{ expiresIn: '1h'})
}

const verifytoken  = (req,res,next) => {
    //obtener el token klas cabecceras de la peticion
    const authHeader = req.headers.authorization
    //Verificar si existe el token 
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message:'Token no proporcionado'})
    }
    // Dividir el token bearer
    const token = authHeader.split(' ')[1]
    //verificar token 
    jwt.verify(token, 'secret_key' ,(err,decoded)=>{
        if (err) {
            return res.status(403).json({message: 'Fallo al autenticar el token '})
            
        }
        req.user = decoded
        next()
    })
}

export{
    createToken,
    verifytoken
}