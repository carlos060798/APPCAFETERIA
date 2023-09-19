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

export { CrearCategory };
