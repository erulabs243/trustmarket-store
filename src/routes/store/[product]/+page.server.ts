import api from "$lib/server/apiClient";
import type { CartRes, ProductRes, RegionsRes } from "$lib/types/apiResponse";
import { fail } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";
import type { Actions, PageServerLoad } from "./$types";
import type { CartType, ProductType } from "$lib/types/apiType";
import { addToCartSchema } from "$lib/schemas/storeSchema";

export const load = (async ({ params }) => {
	const slug = params.product;
	const products = (await api
		.get(`products?handle=${slug}`)
		.json()) as ProductRes;

	if (products.count === 0) {
		throw fail(404, { empty: true });
	}

	const product = products.products[0];
	let relatedByCollection: Array<ProductType> = [];

	if (product.collection) {
		const productsFromCollection = (await api
			.get(`products?collection_id[]=${product.collection_id}&limit=6`)
			.json()) as ProductRes;
		if (productsFromCollection.count > 0) {
			relatedByCollection = productsFromCollection.products.filter(
				(item) => item.handle !== slug,
			);
		}
	}

	// Use redis session to store cart
	const form = await superValidate(addToCartSchema);

	return {
		product,
		related: relatedByCollection,
		form,
	};
}) satisfies PageServerLoad;

type Message = {
	status: "error" | "success";
	text: string;
	cart?: CartType;
};

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const form = await superValidate<typeof addToCartSchema, Message>(
			formData,
			addToCartSchema,
		);

		if (!form.valid) {
			//return fail(400, { form });
			return message(form, { text: "Formulaire invalide", status: "error" });
		}

		if (!formData.has("variant")) {
			return message(form, {
				status: "error",
				text: "Veuillez choisir un modèle",
			});
		}

		// Create cart if not in sessionstorage
		let cartId = cookies.get("__tm__cart") ?? "";
		if (!cartId) {
			//Get regions
			const regions = (await api.get("regions").json()) as RegionsRes;
			const region = regions.regions[0];

			const newCart = (await api
				.post("carts", {
					json: { region_id: region.id },
				})
				.json()) as CartRes;

			if (!newCart) {
				//return fail(400, {form});
				return message(form, {
					text: "Impossible de créer votre panier",
					status: "error",
				});
			}

			cartId = newCart.cart.id;
		}
		//Add line item to cart

		const cart = (await api
			.post(`carts/${cartId}/line-items`, {
				json: {
					variant_id: formData.get("variant"),
					quantity: Number(form.data.quantity),
				},
			})
			.json()) as CartRes;

		if (!cart) {
			//return fail(400, {form});
			return message(form, {
				text: "Impossible d'ajouter le produit au panier",
				status: "error",
			});
		}

		cookies.set("__tm__cart", cart.cart.id, {
			path: "/",
			httpOnly: true,
			secure: false,
			sameSite: "lax",
			maxAge: 60 * 60 * 24 * 7,
		});

		return message(form, {
			text: "Produit ajouté au panier",
			status: "success",
			cart: cart.cart,
		});
	},
} satisfies Actions;
