import * as z from 'zod';

export const BaseRegisterUserSchema = z.object({
  email: z
    .string()
    .min(3, { message: 'Tienes que completar este campo!' })
    .email('Ingresa un email valido!'),
  password: z
    .string()
    .min(6, { message: 'Tiene que tener al menos 6 caracteres!' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'Tiene que tener al menos 6 caracteres!' })
    .optional(),
});

export const RegisterUserSchema = BaseRegisterUserSchema.superRefine(
  ({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Las contraseñas no coinciden',
        path: ['confirmPassword'],
      });
    }
  }
);

export type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>;

export const OtpSchema = z.object({
  email: z
    .string()
    .min(3, { message: 'Tienes que completar este campo!' })
    .email('Ingresa un email valido!'),
  code: z.string().min(6, { message: 'El codigo deve tener 6 digitos' }),
});

export type OtpSchemaType = z.infer<typeof OtpSchema>;
