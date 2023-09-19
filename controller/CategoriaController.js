// logica de conexiones a la base de datos
import Categoria from "../models/Categoria.js";
const CrearCategory = async (req, res) => {
  const nombre = req.body.nombre.toUpperCase();

  try {
    const categoriaDB = await Categoria.findOne({ nombre });
    // validacion de que la categoria no exista ya
    if (categoriaDB) {
      return res.status(400).json({
        msg: `La categoria ${categoriaDB.nombre} ya existe`,
      });
    }
    // generar la categoria

    const data = {
      nombre,
      usuario: req.usuario._id,
    };
    const categoria = new Categoria(data);
    // guardar en la base de datos
    await categoria.save();
    res.json({ msg: "categoria se guardo", categoria });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const ObtenerCategory = async (req, res) => {
  // obtener categorias por listados cuyo estado no se false
  
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categoria] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query).populate(
      "usuario",
      "nombre"
    ).skip(Number(desde)).limit(Number(limite)),
    
  ]);

  res.status(200).json({
    total, categoria
  });
};
const ObtenerCategoryById = async (req, res) => { // obtener categoria por id
  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate(
    "usuario",
    "nombre"
  );
  res.status(200).json({
    categoria,
  });
};

const ActualizarCategory = async (req, res) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const categoria =  await Categoria.findByIdAndUpdate(id, data, {new: true});
  res.status(200).json({
    categoria,
  });
}

const BorrarCategory = async (req, res) => {  // cambiar el estado de la categoria a false

  const { id } = req.params;
 
  try{
    const categoriaBorrada= await Categoria.findByIdAndUpdate(id, { estado: false }, {new: true});
    res.status(200).json({
      categoriaBorrada
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error al borrar la categoria",
      error
    });
  }
}


export { CrearCategory, ObtenerCategory, ObtenerCategoryById,
  ActualizarCategory, BorrarCategory

}; 