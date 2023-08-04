import express from 'express';
import bycscript from 'bcryptjs';
import Usuario from '../models/Usuario.js';


// crear usuario
const CrearUsuario = async (req, res) => {
 
   const {nombre,correo,password,rol} = req.body;
   const User= new Usuario({nombre,correo,password,rol});
   // validacion de datos

   // validar correo
   const existeCorreo = await Usuario.findOne({correo});
    if (existeCorreo) {
        return res.status(400).json({
            msg: "El correo ya existe"
        });
    }


   //encriptar contraseña
    const salt = bycscript.genSaltSync();
    User.password = bycscript.hashSync(password, salt);

// guardar en la base de datos
    try {
      const UserDB = User.save();
        res.status(200).json({
            msg: "Usuario creado correctamente",
            User
        });
    }catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "Error al crear el usuario",
            err
        });
    }
}

// modificar usuario
const ModificarUsuario = async (req, res) => {
    const { id } = req.params;
    const { password, ...resto } = req.body;

    // Validar contra base de datos
    if (password) {
        const salt = bycscript.genSaltSync();
        resto.password = bycscript.hashSync(password, salt);
    }

    try {
        const updatedUser = await Usuario.findByIdAndUpdate(id, resto, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                msg: "Usuario no encontrado"
            });
        }

        res.status(200).json({
            msg: "Usuario modificado correctamente",
            updatedUser
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error al modificar el usuario",
            error
        });
    }
}

// listar usuarios
 const  ListarUsuarios = async (req, res) => {

   /* LISTAR TODOS LOS USUARIOS
   const  usuarios = await Usuario.find();
   */
    /* LISTAR USUARIOS POR PAGINAS 
    await Usuario.find({ estado: true}) // listar solo los usuarios con estado true
    const { limite = 3, desde = 1 } = req.query;

     contar usuarios

    const totalUsuarios = await Usuario.countDocuments({ estado: true})
    const  usuarios = await Usuario.find({ estado: true}).skip(Number(desde)).limit(Number(limite));
    */

    // retornar respuesta deforma simultania las promesas y recortar tiempos de respuesta
    const { limite = 3, desde = 1 } = req.query;

    const [totalUsuarios,usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true}),
        Usuario.find({ estado: true}).skip(Number(desde)).limit(Number(limite))
    ])

    res.status(200).json({
        usuarios,
        totalUsuarios
    });
 }

export{
    CrearUsuario,
    ModificarUsuario,
    ListarUsuarios
}