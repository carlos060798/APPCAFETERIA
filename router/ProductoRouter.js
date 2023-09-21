import express from "express";
import {
  CrearProducto,
  ObtenerProductos,
  ObtenerProductoById,
  ActualizarProducto,
  BorrarProducto,
} from "../controller/ProductoController.js";
import { check } from "express-validator";
import { existeCategoria, existeProducto } from "../helpers/db-valideitor.js";
import validaciones from "../middlewares/authData.js";
import validarJWT from "../middlewares/validar-jsonToken.js";
import { isROLE } from "../helpers/db-valideitor.js";

const router = express.Router();

router
  .route("/")
  .get(ObtenerProductos)
  .post(
    [
      validarJWT,
      check("nombre", "el nombre es obligatorio").not().isEmpty(),
      check("categoria", "no es un id de mongo").isMongoId(),
      check("categoria").custom(existeCategoria),
      validaciones,
    ],
    CrearProducto
  );
// operaciones crud productos
router
  .route("/:id")
  .get(
    [
      //check("id", "no es un id valido").isMongoId(),
      check("id").custom(existeProducto),
      validaciones,
    ],
    ObtenerProductoById
  )

  .put(
    [
      validarJWT,
      check("id", "no es un id valido").isMongoId(),
      check("id").custom(existeProducto),
      validaciones,
    ],
    ActualizarProducto
  )
  .delete(
    [
      validarJWT,
      check("id", "no es un id valido").isMongoId(),
      check("id").custom(existeProducto),
      validaciones,
    ],
    BorrarProducto
  );

export default router;
