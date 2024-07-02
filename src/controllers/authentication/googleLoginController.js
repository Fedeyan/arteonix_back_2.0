import axios from 'axios'
import ControllerResult from '../../utils/controllerResult';
export default async function googleLoginController(tokenParams) {
    try {

        //obtener una respuesta con el token??
        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', tokenParams);
        const { id_token, access_token } = tokenResponse.data;

        // // Verifica el ID token
        const idTokenResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`);
        const payload = idTokenResponse.data;


        return ControllerResult("success", "algo", { googleId: payload?.sub })


    } catch (error) {
        console.error('Error al autenticar:', error);
        return ControllerResult("error", "algo")

    }

}