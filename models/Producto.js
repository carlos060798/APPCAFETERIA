// modelos de la base de datos de categoria

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductoSchema = new Schema({
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
    },

    precio: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "Categoria",
        required: true,
    },
});

 export default mongoose.model("Producto", ProductoSchema );