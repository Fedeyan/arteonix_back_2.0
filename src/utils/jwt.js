import jwt from "jsonwebtoken";
import config from "dotenv";

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
