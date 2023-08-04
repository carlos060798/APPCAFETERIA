// modelos de la base de datos

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});
// funcion para eliminar del retorno el __v y password
UsuarioSchema.methods.toJSON = function () {
  const {__v
, password,...usuario  } = this.toObject();
  return usuario;
}

 export default mongoose.model("Usuario", UsuarioSchema);


