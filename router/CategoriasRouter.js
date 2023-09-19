// Rutas de categorias

import express from "express";
import validarJWT from "../middlewares/validar-jsonToken.js";
import { check } from "express-validator";
import validaciones from "../middlewares/authData.js";
import { CrearCategory } from "../controller/CategoriaController.js";

const router = express.Router();

// rutas de crud

// ruta para crear categoria
router.post("/",
  [
    validarJWT,
    check("nombre", " el mombre es obligatorio").not().isEmpty(),
    validaciones,
  ], CrearCategory
  
 
);
router.get("/", (req, res) => {
  res.send("listar categorias");
});

router.get("/:id", (req, res) => {
  res.send("listar categorias");
});

router.put("/:id", (req, res) => {
  res.send("actualizar categorias");
});

router.delete("/:id", (req, res) => {
  res.send("eliminar categorias");
});

export default router;
