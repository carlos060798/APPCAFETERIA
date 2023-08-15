# integracion de datos de autenticaion de google con el backend

1- se crea en el controlador las funciones para la autenticacion con google

const loginAuth= async (req, res) => {
    const {id_token} = req.body;
try{
 const {nombre,correo,img} = await googleVerify(id_token);

 // registarr usuario con google

 let usuario  = await Usuario.findOne({correo});



 // validar si el usuario existe
   
    if(!usuario){
        // si no existe el usuario se crea con los datos de google
    let  data={
            nombre,
            correo,
            password: ":P",
            img,
            google: true
    }

    
    // guardar en la base de datos
    usuario = new Usuario(data);
    await usuario.save();
    console.log(usuario);
    }

    // si el usuario en la base de datos esta en false esta  desactivado

    if(!usuario.estado){
        return res.status(401).json({
            msg: "usuario bloqueado"
        });
    }
    
    // generar el jwt
    const token = await generarJWT(usuario.id);
    res.json({
        msg: "login ok",
        usuario,
        token
    });

}
catch(err){
    res.status(400).json({
        msg: "token de google no valido",
        err
    });
}

2- se crea la  funcion para que se deslogearse con google
  //  funcion para el cierre de seccion
      const loget = document.getElementById("loget");
      loget.onclick= () => {
         console.log(google.accounts.id);
         google.accounts.id.disableAutoSelect();

         google.accounts.id.revoke(localStorage.getItem("email"), done => {
            localStorage.clear();
            location.reload();
         })
       
      }