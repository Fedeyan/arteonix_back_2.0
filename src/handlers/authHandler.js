import { JsonWebTokenError } from "jsonwebtoken";
import loginController from "../controllers/authentication/loginController";
import logoutController from "../controllers/authentication/logoutController";
import registerController from "../controllers/authentication/registerController";
import response from "../utils/httpResponse";
import { config } from "dotenv";
import googleLoginController from "../controllers/authentication/googleLoginController";

config()

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
} = process.env

export async function registerHandler(req, res, next) {
  try {
    // realizar el registro del usuario
    const { type, message, data } = await registerController(req.body);

    //enviar la respuesta
    return response(type, res, message, data);

  } catch (error) {
    //mensaje de error x consola
    console.error(
      "Se produjo un error en el manejador de registro de usuarios:"
    );
    console.error(error);

    //informar al usuario sobre el error
    return response(
      "error",
      res,
      "Se produjo un error al registrar el usuario"
    );
  }
}


//login

export async function loginHandler(req, res, next) {
  try {
    //obtener resultado de logeo
    const { type, message, data } = await loginController(req.body);


    //retornar respuesta
    return response(type, res, message, data)

  } catch (error) {
    //mensaje de error x consola
    console.error(
      "Se produjo un error en el manejador de login de usuarios:"
    );
    console.error(error);

    //informar al usuario sobre el error
    return response(
      "error",
      res,
      "Se produjo un error al iniciar sesión"
    );
  }
}

export async function logoutHandler(req, res) {
  try {
    const token = req?.headers?.authorization?.split(" ")[1]

    const { type, message, data } = await logoutController(token)

    return response(type, res, message, data)

  } catch (error) {
    console.error(error);

    return response(
      "error",
      res,
      "Se produjo un error al cerrar sesión"
    );
  }
}

export async function googleLoginHandler(req, res, next) {
  try {
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&response_type=code&scope=profile%20email&access_type=offline`;
    res.redirect(authUrl)
  } catch (error) {
    console.error(error)
    res.json("Error")
  }
}

export async function googleLoginResultHandler(req, res, next) {
  const code = req.query.code;
  try {
    const tokenParams = {
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code'
    }

    const { type, message, data } = await googleLoginController(tokenParams)

    return response(type, res, message, data)
  } catch (error) {
    console.log(error)
  }
}