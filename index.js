import express from 'express';
import  dotenv from 'dotenv';
import DB from './db/bd-conexion.js';
import UsuarioRouter from './router/UsuarioRouter.js';
import AuthRouter from './router/AuthRouter.js';
import CategoriasRouter from './router/CategoriasRouter.js';
import ProductoRouter from './router/ProductoRouter.js';
import buscar from './router/Buscar.js';

// configuracion de  servidor y bd-conexion
const app = express();
app.use(express.json());
app.use( express.static('public') );
dotenv.config();
DB();
const port = process.env.PORT || 4000;


// rutas de la app
app.use("/api/usuarios",UsuarioRouter );
app.use("/api/auth",AuthRouter );
app.use("/api/categorias",CategoriasRouter );
app.use("/api/productos",ProductoRouter );
app.use ("/api/buscar", buscar);



// levantar el servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});