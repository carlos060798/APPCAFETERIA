# Temas de la sección:  


Aquí cubriremos varios temas como: 

Definir los alcances de nuestro RESTServer
CRUD
Encriptación de contraseñas
Validaciones personalizadas
Creación de roles
Conexiones con MLAB
Despliegue de base de datos en la nube
Conexión con Robo 3T con base de datos en la nube
Configuración de variables de entorno
Borrado de archivos
Eliminado físico de la base de datos
Eliminación por estado en un campo de la colección

# para encriptar contraseñas se usa 

npm i bcryptjs

bycscript.genSaltSync()=> para generar el  el numero de vueltas que se le va a dar a la encriptacion 

bycscript.hashSync(password, salt)=> para encriptar la constraseña en una sola via recibe la contraseña y el salt para el numero de vueltas


# para validar  datos
npm i express-validator


check("correo","correo no valido").isEmail()=> para validar el correo se importa desde express-validator