// function para verificar el token de google
import {OAuth2Client} from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLECLIENTE);
async function  googleVerify(token= '') {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLECLIENTE, 
  });
  
    const payload = ticket.getPayload();
    
    console.log(payload);
}

export default googleVerify;