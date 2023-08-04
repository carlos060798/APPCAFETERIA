import express from 'express';
import  dotenv from 'dotenv';
import DB from './db/bd-conexion.js';
import UsuarioRouter from './router/UsuarioRouter.js';

// configuracion de  servidor y bd-conexion
const app = express();
app.use(express.json());
dotenv.config();
DB();
const port = process.env.PORT || 4000;


// rutas de la app
app.use("/api/usuarios",UsuarioRouter );



// levantar el servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});