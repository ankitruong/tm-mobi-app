import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Please enter your email" })
    .email({
      message: "Please enter a valid email",
    }),
  password: z.string().trim().min(1, { message: "Please enter your password" }),
});

export type TLoginFormSchema = z.infer<typeof LoginFormSchema>;

export const SignUpFormSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, { message: "Please enter your email" })
      .email({
        message: "Please enter a valid email",
      }),

    password: z
      .string()
      .trim()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[\W_]/, { message: "Password must contain at least one symbol" }),

    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type TSignUpFormSchema = z.infer<typeof SignUpFormSchema>;

export const CompleteProfileFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Please enter your email" })
    .email({
      message: "Please enter a valid email",
    }),

  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[\W_]/, { message: "Password must contain at least one symbol" }),

  firstName: z
    .string()
    .trim()
    .min(1, { message: "Please enter your given name" }),

  lastName: z
    .string()
    .trim()
    .min(1, { message: "Please enter your family name" }),
});

export type TCompleteProfileFormSchema = z.infer<
  typeof CompleteProfileFormSchema
>;

export const ChangePasswordFormSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[\W_]/, { message: "Password must contain at least one symbol" }),

    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Please confirm your password" }),

    otp: z.string().trim().min(1, { message: "Please enter your OTP" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type TChangePasswordFormSchema = z.infer<
  typeof ChangePasswordFormSchema
>;

export const UpdateProfileFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "Please enter your first name" }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Please enter your last name" }),
});

export type TUpdateProfileFormSchema = z.infer<typeof UpdateProfileFormSchema>;
