import { validationResult } from "express-validator";

// middleware para validar los datos de entrada resibe req,res,next

const validaciones =(req,res,next)=>{
    const validacion = validationResult(req); // se valida los datos de entrada
    // si no hay errores
    if (!validacion.isEmpty()) { // si hay errores
        return res.status(400).json({
           
            validacion
        });
    }
    // si no hay errores
    next();
}
export default validaciones;