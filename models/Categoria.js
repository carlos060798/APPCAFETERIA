// modelos de la base de datos de categoria

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategoriaSchema = new Schema({
   nombre: {
        type: String,
        required: [true, " el nombre es obligatorio  "]
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,

    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    }

});

 export default mongoose.model("Role", roleSchema);