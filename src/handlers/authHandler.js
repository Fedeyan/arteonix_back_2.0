import loginController from "../controllers/authentication/loginController";
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