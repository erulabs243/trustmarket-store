import { z } from "zod";

export const loginSchema = z.object({
	username: z.string().min(1, "L'utilisateur est obligatoire"),
	password: z.string().min(1, "Le mot de passe est obligatoire"),
});
