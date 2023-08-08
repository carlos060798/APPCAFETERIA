import  express from "express";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";



// login

const inicioSeccion= async (req, res) => {

    const {correo, password} = req.body;

    // validar que el correo exista
    const usuario = await Usuario.findOne({correo});

    if(!usuario){
        return res.status(400).json({
            msg: "usuario o contraseña incorrectos - correo"
        });
    }
    // validar que el usuario este activo
    if(!usuario.estado){
        return res.status(400).json({
            msg: "usuario o contraseña incorrectos - estado: false"
        });
    }

    // validar la contraseña
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if(!validPassword){
        return res.status(400).json({
            msg: "usuario o contraseña incorrectos - password"
        });
    }

    // generar el jwt

    try{
        res.json({
            msg: "login ok"
        });   
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "error en el servidor"
        });
    }


}

export {
    inicioSeccion
}