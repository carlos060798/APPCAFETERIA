//  controladores de producto
import Producto from "../models/Producto.js";

const CrearProducto = async (req, res) => {
    const { estado, usuario, ...body } = req.body;

    try {
      const productoDB = await Producto.findOne({ nombre: body.nombre });
      // validacion de que la producto no exista ya
      if (productoDB) {
        return res.status(400).json({
          msg: `el producto ${productoDB.nombre} ya existe`,
        });
      }
      // generar la producto
  
      const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),  
        usuario: req.usuario._id,
      };
      const producto = new Producto(data);
      // guardar en la base de datos
      await producto.save();
      res.json({ msg: "producto se guardo", producto });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Hable con el administrador",
      });



    }}

const ObtenerProductos= async (req, res) => {
 // obtener PRODUCTO por listados cuyo estado no se false
  try{
 const { limite = 5, desde = 0 } = req.query;
 const query = { estado: true };

 const [total, productos] = await Promise.all([
   Producto.countDocuments(query),
   Producto.find(query)
      .populate("usuario", "nombre")
     .populate("categoria", "nombre")
     .skip(Number(desde))
     .limit(Number(limite)),
 ]);

 res.status(200).json({
   total,
   productos,
 });
} catch (error) {
    console.log(error);
    res.status(500).json({
        msg: "error al obtener productos",
        error,
    });
}
}

const ObtenerProductoById = async (req, res) => {
   try{
     // obtener producto por id
  const { id } = req.params;
  const producto = await Producto.findById(id).populate("usuario", "nombre").populate("categoria", "nombre");
  res.status(200).json({
producto,
  });
   } catch(error){
         console.log(error);
         res.status(500).json({
              msg: "error al obtener producto por id",
              error,
         });
   }
}

const ActualizarProducto = async (req, res) => {
   
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();

    }
    data.usuario = req.usuario._id;
  
    const producto =  await Producto.findByIdAndUpdate(id, data, {new: true});
    res.status(200).json({
      producto,
    });




}

const BorrarProducto = async (req, res) => {
    const { id } = req.params;
 
    try{
      const productoBorrada= await Producto.findByIdAndUpdate(id, { estado: false }, {new: true});
      res.status(200).json({
        productoBorrada
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Error al borrar la categoria",
        error
      });
    }}

export {
    CrearProducto,
    ObtenerProductos,
    ObtenerProductoById,
    ActualizarProducto,
    BorrarProducto
}