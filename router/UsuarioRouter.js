import express from "express";
import { CrearUsuario, ListarUsuarios, ModificarUsuario } from "../controller/UsuarioController.js";
import { check } from "express-validator";
import validaciones from "../middlewares/authData.js";
import { isROLE } from "../helpers/db-valideitor.js";


const router = express.Router();
// si se quiere validar los datos de entrada se agrega como segundo parametro [validaciones] sino pasan no se ejecuta el controlador
router.post(
  "/",
  [
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("correo", "correo no valido").isEmail(),
    check("password", "la contraseña debe tener minimo 6 caracteres").isLength({
      min: 6,
    }),
   
    // validacion del rol
    check("rol").custom(rol=>isROLE(rol)),
    validaciones,
  ],
  CrearUsuario
);

router.get("/",ListarUsuarios);

// rutas del crud

router.put("/:id",[
    check("id", "No es un ID valido").isMongoId(),
    validaciones
],ModificarUsuario);

export default router;
