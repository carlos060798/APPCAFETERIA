// modelos de la base de datos

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const roleSchema = new Schema({
   rol: {
        type: String,
        required: [true, " el rol es obligatorio  "]
    }
});

 export default mongoose.model("Role", roleSchema);

