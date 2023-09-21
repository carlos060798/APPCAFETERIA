// rutas para buscar   informacion de la api 

import express from 'express';
import { Busqueda } from '../controller/BucarController.js';


const router = express.Router();

router.get('/:coleccion/:termino',Busqueda);


export default router;