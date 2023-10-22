import { z } from "zod";

export const addToCartSchema = z.object({
	quantity: z.number().min(1, "Il faut au moins 1 produit").default(1),
});
