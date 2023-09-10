// Rutas de categorias  

import  express from 'express';

const router= express.Router();

// rutas de crud 

router.get('/', (req, res)=>{
    res.send('listar categorias');
});

router.get('/:id', (req, res)=>{
    res.send('listar categorias');
})

router.post('/', (req, res)=>{
    res.send('crear categorias');
})

router.put('/:id', (req, res)=>{
    res.send('actualizar categorias');
})

router.delete('/:id', (req, res)=>{
    res.send('eliminar categorias');
})



export default router;