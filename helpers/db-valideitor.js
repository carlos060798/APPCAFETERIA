//  funcion para validar roles y email
import Usuario from "../models/Usuario.js";
import Role from "../models/role.js";

const isROLE=async (rol = "") => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol)
      throw new Error(`el rol ${rol} no esta registrado en la base de datos`);
  }

 

export{
    isROLE,
    
}