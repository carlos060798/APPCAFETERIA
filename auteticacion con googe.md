# temas 
## Temas de la sección:
Aquí cubriremos varios temas como: 

Generar API Key de Google
Generar API Secret
Usar librerías de Google para la validación de tokens
Tips importantes en PostMan
Despliegues a Heroku
Uso del Google SignIn en el Front-End
Crear usuarios personalizados en base a respuestas de Google


## Generar API Key de Google
https://console.cloud.google.com/apis/dashboard?pli=1&project=grounded-tine-331300
Para generar una API Key de Google, debemos ir a la consola de Google Cloud Platform y crear un nuevo proyecto.

2- Luego de crear el proyecto, debemos ir a la sección de APIs y Servicios y habilitar la API de Google+.

3- sebe ir  ala seccion de crear pantalla de concentimiento y llenar los datos que se piden

4-  crear credenciales y seleccionar la opcion de ID de cliente de OAuth se selecciona la opcion de aplicacion web y se llena los datos que se piden

5- en la seccion de Orígenes autorizados de JavaScript Para usar con solicitudes de un navegador
URI 1 
http://localhost
URI 2 
http://localhost:4100

son las direcciones que se van ausar en el proyecto

6- se crea la credencial y se copia el id de cliente y se pega en el archivo de enviroment.ts


7-se crea el formato en html
  <script src="https://accounts.google.com/gsi/client" async defer></script>
      <div id="g_id_onload"
         data-client_id="YOUR_GOOGLE_CLIENT_ID"
         data-login_uri="https://your.domain/your_login_endpoint"
         data-auto_prompt="false">
      </div>
      <div class="g_id_signin"
         data-type="standard"
         data-size="large"
         data-theme="outline"
         data-text="sign_in_with"
         data-shape="rectangular"
         data-logo_alignment="left">
      </div>

8- se remite al apartado de Handle credential responses with JavaScript functions se debe agregar el data-callback="handleCredentialResponse" en el div de g_id_signin
ya que es la funcion con la cual se llama cuando la autenticacion es exitosa


9 - se crea la funcion en el archivo de app.component.ts
     function handleCredentialResponse(response) {
         //  se obtiene el token de google
        const body={id_token: response.credential}
        // se envia el token al backend
         fetch("http://localhost:4100/api/auth/google",{
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
         }).then(res => res.json()).then(data => {
            console.log(data);
         }).catch(err => {
            console.log(err);
         })
        
        // console.log(response.credential);
      }

10- se crea la funcion en el archivo la ruta para la autenticacion y el metodo
router.post("/google",[check("id_token", "el id_token es necesario").not().isEmpty(),
validaciones
],loginGoogle
) 

11- se crea la funcion en el archivo de controlador
router.post("/google",[check("id_token", "el id_token es necesario").not().isEmpty(),
validaciones
],loginGoogle
) 

12- tomar token de google y verificar si existe en la base de datos se instala la libreria de google-auth-library
npm install google-auth-library --save


