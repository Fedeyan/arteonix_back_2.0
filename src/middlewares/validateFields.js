import response from "../utils/httpResponse";
import validateSchema, { loginSchema, registerSchema } from "../utils/zValidations";

function validateFields(req, res, next) {
  let errors;
  if (req.path === "/register") {
    errors = validateSchema(registerSchema, req.body);
  }

  if (req.path === "/login") {
    errors = validateSchema(loginSchema, req.body);
  }

  if (errors) {
    return response("badRequest", res, "Hay errores en los campos", errors);
  } else {
    return next();
  }
}

export default validateFields;
