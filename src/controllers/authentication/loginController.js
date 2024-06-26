import { Op } from "sequelize";
import db from "../../models";
import ControllerResult from "../../utils/controllerResult";
import { createToken } from "../../utils/jwt";
import bcryptCompareAsync from "../../utils/bcryptCompareAsync";


export default async function loginController({ username, password }) {
    try {
        //esperar a que se lleve a cabo la funcion del registro
        const { type, message, data } = await loginUser({ username, password });
        //retornar resultado
        return ControllerResult(type, message, data);

    } catch (error) {
        //manejo de errores
        console.error(error);

        //respuesta negativa
        return ControllerResult(
            "error",
            "Se produjo un error en loginController"
        );
    }
}

async function loginUser(userData) {
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
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { username: { [Op.iLike]: userData.username } },
                    { email: { [Op.iLike]: userData.username } }
                ],
            },
        });


        // si el usuario no existe
        if (!user) {
            result.message = "El usuario no existe"
            result.type = "notFound"
            return result
        }

        // comprobar contraseñas
        const match = await bcryptCompareAsync(userData.password, user.password)

        if (!match) {
            result.data = createToken({ id: user.id, username: user.username }, "7d")
            result.type = "success"
        } else {
            result.message = "Contraseña incorrecta"
            result.type = "notAuthorized"
        }

        // devolver respuesta
        return result;

    } catch (error) {
        console.error("error en la funcion loginUser")
        console.error(error)
        return { type: "error", message: "Se produjo un error en el servidor" };

    }
}