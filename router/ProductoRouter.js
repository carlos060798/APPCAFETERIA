import express from "express";
import { CrearProducto, ObtenerProducto,
  ObtenerProductoById,
  ActualizarProducto,
  BorrarProducto} from "../controller/ProductoController.js";



const router = express.Router();

router.route("/").get(ObtenerProducto).post( CrearProducto);
router
  .route("/:id")
  .get(ObtenerProductoById)
  .put(ActualizarProducto)
  .delete(BorrarProducto);

export default router;
