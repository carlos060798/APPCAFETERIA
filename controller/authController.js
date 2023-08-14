import  express from "express";
import Usuario from "../models/UsuarioModel.js";
import bcrypt from "bcryptjs";
import generarJWT from "../helpers/generarToken.js";



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

    const token = await generarJWT(usuario.id);

    try{
        res.json({
            msg: "login ok",
            usuario,
            token
        });   
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "error en el servidor"
        });
    }


}


// validacion con google

const loginGoogle = async (req, res) => {
    const {id_token} = req.body;

    res.json({
        msg: "login ok",
        id_token
    });

}

export {
    inicioSeccion,
    loginGoogle
}