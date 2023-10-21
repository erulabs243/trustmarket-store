import type { PageServerLoad, Actions } from "./$types";
import { z } from "zod";
import { superValidate } from "sveltekit-superforms/server";
import { fail } from "@sveltejs/kit";
import { loginSchema } from "$lib/schemas/authSchema";

export const load = (async () => {
	const form = await superValidate(loginSchema);

	return {
		form,
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, loginSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		return { form };
	},
} satisfies Actions;
