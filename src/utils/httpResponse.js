class HTTPResponse {
  constructor(message, data, status) {
    this.message = message;
    this.data = data;
    this.status = status;
  }

  static success(message, data) {
    return new HTTPResponse(message, data, 200);
  }

  static notFound(message, data) {
    return new HTTPResponse(message, data, 404);
  }

  static notAuthorized(message, data) {
    return new HTTPResponse(message, data, 401);
  }

  static conflict(message, data) {
    return new HTTPResponse(message, data, 409);
  }

  static badRequest(message, data) {
    return new HTTPResponse(message, data, 400);
  }

  static error(message, data) {
    return new HTTPResponse(message, data, 500);
  }
}

//function para responses http

export default function response(type, res, message, data) {
  try {
    //obtener los metodos validos
    const validTypes = Object.getOwnPropertyNames(HTTPResponse).filter(
      (x) => !["length", "arguments", "prototype", "name", "caller"].includes(x)
    );

    //comprobar si la clase contiene el metodo pasado por type
    if (!validTypes.includes(type)) {
      throw new Error("El tipo de respuesta solicitado es incorrecto.");
    }
    //estandarizar respuesta
    const parseResponse = HTTPResponse[type](message, data);

    //retornar la respuesta
    return res.status(parseResponse.status).json(parseResponse);
  } catch (error) {
    //enviar un mensaje de error x consola
    console.error("Se produjo un error: ");
    console.error(error);
  }
}
