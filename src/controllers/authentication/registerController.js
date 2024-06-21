import { Op } from "sequelize";
import db from "../../models";
import ControllerResult from "../../utils/controllerResult";
import bcrypt from "bcrypt";
import { createToken } from "../../utils/jwt";

//controlador de registro del usuario.
export default async function registerController({ username, password, email, }) {

  try {

    //esperar a que se lleve a cabo la funcion del registro
    const { type, message, data } = await registerUser({ username, password, email });

    //retornar resultado
    return ControllerResult(type, message, data);

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

// funcion para registrar el usuario
async function registerUser(userData) {

  //transaccion db
  const transaction = await db.sequelize.transaction();

  try {
    //resultado de la función
    const result = {
      type: "",
      message: "",
      data: {}
    };

    //modelo del usuario
    const { User } = db.sequelize.models;

    //comprobar si el usuario o el mail fueron usados en otra cuenta.
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username: userData.username }, { email: userData.email }],
      },
      transaction,
    });

    if (!existingUser) {

      //secure pwd
      const hashPwd = await bcrypt.hash(userData.password, 10);

      //crear usuario
      const user = await User.create(
        {
          username: userData.username,
          password: hashPwd,
          email: userData.email,
        },
        { transaction }
      );

      //realizar los cambios en la db
      await transaction.commit();


      //generar token de autenticación (login automático luego de registro del usuario.)
      const token = createToken({ id: user.id, username: user.username }, "7d")

      //definir respuesta satisfactoria
      result.type = "success";
      result.message = "Registro exitoso";
      result.data = { token }

    } else {

      //definir respuesta en caso de conflicto
      result.type = "conflict";
      result.message =
        existingUser.email === userData.email
          ? `El email ya se encuentra registrado`
          : `El nombre de usuario '${userData.username}' ya existe`;

      //revertir los cambios en la db
      await transaction.rollback();
    }

    //devolver respuesta.
    return result;

  } catch (error) {

    // mostrar el error en consola.
    console.log("Error en la funcion registerUser");
    console.error(error);

    //revertir los cambios hechos en la db
    await transaction.rollback();

    //devolver respuesta de error
    return { type: "error", message: "Se produjo un error en el servidor" };
  }
}
