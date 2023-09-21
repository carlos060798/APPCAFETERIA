
import Categoria from "../models/Categoria.js";
import Producto from "../models/Producto.js";
import Usuario from "../models/UsuarioModel.js";
import mongoose from "mongoose";

const DataBD = ["usuarios", "categorias", "productos", "roles"];
const { ObjectId } = mongoose.Types;



const buscarUsuarios = async (termino = "", res) => {
    const esMongoID = ObjectId.isValid(termino);

    if (!esMongoID) {
        return res.json({
            results: []
        });
    }

    try {
        const usuario = await Usuario.findById(termino);

        if (!usuario) {
            return res.json({
                results: []
            });
        }

        return res.json({
            results: [usuario]
        });

     
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al buscar el usuario",
            error
        });
    }
};

const  buscarProducto= async (termino = '', res ) => {
  const esMongoID = ObjectId.isValid( termino ); // TRUE 

  if ( esMongoID ) {
      const producto = await Producto.findById(termino)
                          .populate('categoria','nombre');
      return res.json({
          results: ( producto ) ? [ producto ] : []
      });
  }

  const regex = new RegExp( termino, 'i' );
  const productos = await Producto.find({ nombre: regex, estado: true })
                          .populate('categoria','nombre')

  res.json({
      results: productos
  });

}

const buscarCategorias = async( termino = '', res  ) => {

  const esMongoID = ObjectId.isValid( termino ); // TRUE 

  if ( esMongoID ) {
      const categoria = await Categoria.findById(termino);
      return res.json({
          results: ( categoria ) ? [ categoria ] : []
      });
  }

  const regex = new RegExp( termino, 'i' );
  const categorias = await Categoria.find({ nombre: regex, estado: true });

  res.json({
      results: categorias
  });

}

const Busqueda = (req, res) => {
  const { coleccion, termino } = req.params;
  if (!DataBD.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${Object.keys(DataBD)}`,
    });
  }
  try {
    switch (coleccion) {
      case "usuarios":
        buscarUsuarios(termino, res);
        break;
      case "categorias":
         buscarCategorias(termino, res);
        break;
      case "productos":
          buscarProducto(termino, res);
        break;
      default:
        res.status(500).json({
          msg: "Se le olvido hacer esta busqueda",
        });
        break;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Se le olvido hacer esta busqueda",
      error,
    });
  }
};

export { Busqueda };
