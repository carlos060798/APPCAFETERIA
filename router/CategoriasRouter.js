// Rutas de categorias

import express from "express";
import validarJWT from "../middlewares/validar-jsonToken.js";
import { check } from "express-validator";
import validaciones from "../middlewares/authData.js";
import {
  CrearCategory,
  ObtenerCategory,
  ObtenerCategoryById,
  ActualizarCategory,
  BorrarCategory
} from "../controller/CategoriaController.js";
import { existeCategoria, isROLE } from "../helpers/db-valideitor.js";

const router = express.Router();

// rutas de crud

// ruta para crear categoria
router.post(
  "/",
  [
    validarJWT,
    check("nombre", " el mombre es obligatorio").not().isEmpty(),
    validaciones,
  ],
  CrearCategory
);
// ruta para obtener categorias por listados y por id
router.get("/", ObtenerCategory);
router.get(
  "/:id",
  [
    check("id", "el id no es valido").isMongoId(),
    check("id").custom(existeCategoria),
    validaciones,
  ],
  ObtenerCategoryById
);

router.put("/:id", [
  validarJWT,
  check("nombre", "el nombre es obligatorio").not().isEmpty(),
  check("id").custom(existeCategoria),
  validaciones,
], ActualizarCategory);


router.delete("/:id",[validarJWT,
  check("id", "el id no es valido").isMongoId(),
  check("id").custom(existeCategoria),
  validaciones
], BorrarCategory) 

export default router;
/*
[validarJWT,
  isROLE,
  check("id", "el id no es valido").isMongoId(),
  check("id").custom(existeCategoria),
  validaciones], BorrarCategory); */