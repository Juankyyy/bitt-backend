import z from "zod";

const objectId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format");

export const userValidation = z.object({
  name: z
    .string("El username debe ser un string")
    .min(3, "El username debe tener al menos 3 carácteres")
    .max(50, "El username debe tener máximo 50 carácteres")
    .trim(),
  username: z
    .string("El username debe ser un string")
    .startsWith("@")
    .min(3, "El username debe tener al menos 3 carácteres")
    .max(50, "El username debe tener máximo 50 carácteres")
    .trim(),
  email: z
    .email("El email debe ser un email válido")
    .min(10, "El email debe tener al menos 3 carácteres")
    .max(70, "El email debe tener máximo 50 carácteres")
    .trim(),
  password: z.string("La contraseña debe ser un string").min(6).max(50).trim(),
  avatar: z.url("La url del avatar debe ser un url válido").optional(),
  banner: z.url("La url del banner debe ser un url válido").optional(),
  bio: z.string().max(150).optional(),
  location: z.string().max(30).optional(),
  website: z.url("La url del website debe ser un url válido").optional(),
  following: z.array(objectId).optional().default([]).default([]),
  followers: z.array(objectId).optional().default([]).default([]),
  followingCount: z.number().min(0).optional().default(0),
  followersCount: z.number().min(0).optional().default(0),
});

export const validateUser = (input) => {
  return userValidation.safeParse(input);
};

export const validateCreateUser = (input) => {
  const UserCreateValidation = UserCreateValidation.omit({
    following: true,
    followers: true,
    followingCount: true,
    followersCount: true,
    avatar: true,
    banner: true,
    bio: true,
    location: true,
    website: true,
  });

  return UserCreateValidation.safeParse(input);
};
