//  funcion para validar roles y email
import Categoria from "../models/Categoria.js";
import Producto from "../models/Producto.js";
import Role from "../models/role.js";

const isROLE=async (rol = "") => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol)
      throw new Error(`el rol ${rol} no esta registrado en la base de datos`);
  }
// funcion para validar si existe  la categoria por id
 const existeCategoria= async (id) => {
     const existeCategoria = await Categoria.findById(id);
      if (!existeCategoria)
        throw new Error(`el id ${id} no existe`);
 }

 //  function para validar si existe el producto
  const existeProducto= async (id) => {
      const existeProducto = await Producto.findById(id);
      if (!existeProducto)
        throw new Error(`el id ${id} no existe`);}
export{
    isROLE,
    existeCategoria,
    existeProducto
    
}