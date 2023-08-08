//  function para validar el token generado

import jwt from "jsonwebtoken";
import Usuario from "../models/UsuarioModel.js";

const validarJWT = async (req, res, next) => {
  // leer el token de los headers

  const token = req.header("x-token");
  // si no hay token

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  // validar el token

  try {
    // verifica la valides del token
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    // validar informacion del usuario
    const usuario = await Usuario.findById(uid);
    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Token no valido",
    });
  }
};

export default validarJWT;
