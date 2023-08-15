import  express from "express";
import bcrypt from "bcryptjs";
import generarJWT from "../helpers/generarToken.js";
import googleVerify from "../helpers/googleverificar.js";
import Usuario from '../models/UsuarioModel.js';

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

const loginAuth= async (req, res) => {
    const {id_token} = req.body;
try{
 const {nombre,correo,img} = await googleVerify(id_token);

 // registarr usuario con google

 let usuario  = await Usuario.findOne({correo});



 // validar si el usuario existe
   
    if(!usuario){
        // si no existe el usuario se crea con los datos de google
    let  data={
            nombre,
            correo,
            password: ":P",
            img,
            google: true
    }

    
    // guardar en la base de datos
    usuario = new Usuario(data);
    await usuario.save();
    console.log(usuario);
    }

    // si el usuario en la base de datos esta en false esta  desactivado

    if(!usuario.estado){
        return res.status(401).json({
            msg: "usuario bloqueado"
        });
    }
    
    // generar el jwt
    const token = await generarJWT(usuario.id);
    res.json({
        msg: "login ok",
        usuario,
        token
    });

}
catch(err){
    res.status(400).json({
        msg: "token de google no valido",
        err
    });
}

  
}

export {
    inicioSeccion,
    loginAuth
}