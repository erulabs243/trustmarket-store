import type { LayoutServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
	const user = cookies.get("__tm__session") ?? "";

	return { user };
}) satisfies LayoutServerLoad;
