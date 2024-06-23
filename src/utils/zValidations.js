import { z } from "zod";

// auth schemas

// register
const registerSchema = z.object({

  //correo
  email: z
    .string({
      required_error: "El email es obligatorio",
      invalid_type_error: "El email debe ser un string",
    })
    .email({
      message: "Ingresá un email válido",
    }),

  //contraseña
  password: z
    .string({
      required_error: "La contraseña es obligatoria",
      invalid_type_error: "La contraseña debe ser un string",
    })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),

  //confirmar contraseña
  confirmPassword: z
    .string({
      required_error: "Campo obligatorio",
      invalid_type_error: "Este campo recibe texto",
    })
    .min(6, { message: "Ingresá al menos 6 caracteres" }),

  //usuario
  username: z.string().min(3, {
    message: "El nombre de usuario debe contener al menos 3 caracteres",
  }),

  //rol
  role: z
    .enum(["artist", "buyer"], {
      errorMap: (issue, ctx) => {
        if (issue.code === "invalid_enum_value") {
          return { message: "El rol ingresado no es válido" };
        }
        return { message: ctx.defaultError };
      },
    })
    .optional(),
}).refine(data => data.password === data.confirmPassword, { message: "Las contraseñas no coinciden", path: ["confirmPassword"] });




// login
const loginSchema = z.object({
  password: z
    .string({
      required_error: "La contraseña es obligatoria",
      invalid_type_error: "La contraseña debe ser un string",
    })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  username: z
    .string()
    .min(3, {
      message: "El nombre de usuario debe contener al menos 3 caracteres",
    })
    .optional(),
});

// validate schema
function validateSchema(schema, data) {
  try {
    return schema.parse(data).errors;
  } catch (error) {
    return error.errors;
  }
}

// exports
export { registerSchema, loginSchema };
export default validateSchema;
