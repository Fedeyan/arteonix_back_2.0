import { Op } from "sequelize";
import db from "../../models";
import ControllerResult from "../../utils/controllerResult";

export default async function registerController({
  username,
  password,
  email,
}) {
  try {
    //esperar a que se lleve a cabo la funcion del registro
    const { type, message } = await registerUser({ username, password, email });
    console.log("controller, ", message);
    //retornar resultado
    return ControllerResult(type, message);
  } catch (error) {
    //manejo de errores
    console.error(error);

    //respuesta negativa
    return ControllerResult(
      "error",
      "Se produjo un error en registerController"
    );
  }
}

async function registerUser(userData) {
  try {
    const result = { type: "", message: "" };
    const { User } = db.sequelize.models;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username: userData.username }, { email: userData.email }],
      },
    });

    if (!existingUser) {
      await User.create({
        username: userData.username,
        password: userData.password,
        email: userData.email,
      });

      result.type = "success";
      result.message = "Registro exitoso";
    } else {
      console.log();

      result.type = "conflict";
      result.message =
        existingUser.email === userData.email
          ? `El email ya se encuentra registrado`
          : `El nombre de usuario '${userData.username}' ya existe`;
    }
    return result;
  } catch (error) {
    console.log("Error en la funcion registerUser");
    console.error(error);

    return { type: "error", message: "Se produjo un error en el servidor" };
  }
}
