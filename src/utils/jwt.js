import jwt from "jsonwebtoken";
import { config } from "dotenv";
import util from 'util'

//configurar dotenv
config();

//secreto jwt
const { JWT_SECRET } = process.env;

// funcion generadora de tokens
export function createToken(payload, exp) {
  try {
    //generar el token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: exp });

    //devolver el token
    return token;
  } catch (error) {
    //manejo de error
    console.error("Se produjo un error al generar el token");
    console.error(error);
  }
}


export async function boolVerifyToken(token) {
  try {

    //promisify jwt.verify
    const promisifiedVerify = util.promisify(jwt.verify)

    //verificar token
    console.log("verificando token")
    await promisifiedVerify(token, JWT_SECRET)

    //resupuesta positiva
    console.log("token verificado con exito")
    return { isValidToken: true, message: "" }

  } catch (error) {

    //mostrar error
    if (error.message === "invalid signature") {
      console.log("se recibió un token con firma inválida")
    }
    //respuesta negativa
    return { isValidToken: false, message: "" }
  }
}