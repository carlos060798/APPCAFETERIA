// fuction para validar el rol del usuario

const isAdmin = (req,res,next) => {
    if(!req.usuario){ // si no existe el usuario
        return res.status(500).json({
            msg: "Se quiere verificar el rol sin validar el token primero",
        });
    }
    // validacion del rol
    const {rol,nombre} = req.usuario;
    // si el rol no es admin
    if(rol !== "ADMIN_ROLE"){
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`,
        });
    }
    // si el rol es admin
    next();
}

const tieneRole = (...roles) => {
     return (req,res,next) => {
        if(!req.usuario){ // si no existe el usuario
            return res.status(500).json({
                msg: "Se quiere verificar el rol sin validar el token primero",
            });
        }
        // si el rol no esta en el arreglo de roles
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`,
            });
        }
       next();
     }
}

export {isAdmin,
    tieneRole

};