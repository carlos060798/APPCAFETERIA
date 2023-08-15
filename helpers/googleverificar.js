// function para verificar el token de google
import {OAuth2Client} from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLECLIENTE);
async function  googleVerify(token= '') {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLECLIENTE, 
  });
  
    const {name,email,picture} = ticket.getPayload();
    
   return {
    nombre:name,
    correo:email,
     img:picture};
}

export default googleVerify;