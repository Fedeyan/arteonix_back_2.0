import { JsonWebTokenError } from "jsonwebtoken";
import loginController from "../controllers/authentication/loginController";
import logoutController from "../controllers/authentication/logoutController";
import registerController from "../controllers/authentication/registerController";
import response from "../utils/httpResponse";

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

export default async function logoutHandler(req, res) {
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