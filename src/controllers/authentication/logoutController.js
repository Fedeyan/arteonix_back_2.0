import db from "../../models";
import ControllerResult from "../../utils/controllerResult";
import { boolVerifyToken } from "../../utils/jwt";

export default async function logoutController(token) {
    console.log(token)
    try {
        const { type, message, data } = await logout(token)
        return ControllerResult(type, message, data)
    } catch (error) {
        console.error("Se produjo un erro en logout controller")
    }
}

async function logout(token) {
    try {

        //resultado de la función
        const result = {
            type: "",
            message: "",
            data: {}
        };

        //verificar firma del token
        const { isValidToken } = await boolVerifyToken(token)

        // en caso de que no sea válido
        if (!isValidToken) {
            result.message = "El token de autenticación es inválido"
            result.type = "badRequest"
            return result
        }

        //modelo de blacklist
        const { TokensBlacklist } = db.sequelize.models;


        // comprobar si el token esta en la blacklist
        const isBlacklistedToken = await TokensBlacklist.count({
            where: {
                token
            }
        })


        //respuesta en caso de que el token este invalidado
        if (isBlacklistedToken) {
            result.message = "Sesión inválida"
            result.type = "notAuthorized"
            return result
        }

        // en caso contrario se lo añade a la db
        await TokensBlacklist.create({ token })


        // enviar mensaje
        result.message = "Cerraste sesión"
        result.type = "success"
        return result

    } catch (error) {

        //manejo de errores
        if (error instanceof JsonWebTokenError) {
            return { type: "badRequest", message: "Token de autenticación inválido" }
        } else {
            console.log("se produjo un error en la funcion logout")
            return { type: "error", message: "Se produjo un error al cerrar sesión" }
        }

    }

}