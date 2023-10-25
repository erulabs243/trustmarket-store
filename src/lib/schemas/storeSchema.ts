import { z } from "zod";
import validator from "validator";

export const addToCartSchema = z.object({
	quantity: z.number().min(1, "Il faut au moins 1 produit").default(1),
});

export const addressSchema = z.object({
	first_name: z.string().min(1, "Nom obligatoire"),
	last_name: z.string().min(1, "Prénom obligatoire"),
	address_1: z.string().min(1, "Adresse obligatoire"),
	city: z.string().min(1, "Ville obligatoire"),
	country_code: z
		.string()
		.min(1, "Pays obligatoire")
		.refine(validator.isISO31661Alpha2),
	postal_code: z.string().min(1, "Code postal obligatoire").default("00000"),
	phone: z.string().refine(validator.isMobilePhone),
	company: z.string(),
	address_2: z.string(),
	province: z.string(),
});
