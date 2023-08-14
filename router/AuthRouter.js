import express from "express";
import { check } from "express-validator";
import validaciones from "../middlewares/authData.js";
import {    inicioSeccion, loginGoogle
}from "../controller/authController.js";

const router = express.Router();

// autenticacion  con jwt para el login

router.post("/login", [
    check("correo", "correo no valido").isEmail(),
    check("password", "la contraseña es obligatoria").not().isEmpty(),
    validaciones
],    inicioSeccion
) 

// ruta para autencticarse con google
router.post("/google",[check("id_token", "el id_token es necesario").not().isEmpty(),
validaciones
],loginGoogle
) 


export default router;