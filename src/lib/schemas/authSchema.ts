import { z } from "zod";
import validator from "validator";

export const loginSchema = z.object({
	username: z.string().min(1, "L'utilisateur est obligatoire"),
	password: z.string().min(1, "Le mot de passe est obligatoire"),
});

export const registrationSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, "Adresse e-mail obligatoire")
		.email("Adresse e-mail invalide"),
	firstName: z.string().trim().min(3, "Nom obligatoire"),
	lastName: z.string().trim().min(3, "Prénom obligatoire"),
	phone: z.string().trim().refine(validator.isMobilePhone),
	password: z
		.string()
		.trim()
		.min(1, "Mot de passe obligatoire")
		.refine(validator.isStrongPassword),
});
