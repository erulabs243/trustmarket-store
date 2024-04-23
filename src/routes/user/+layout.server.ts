import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ cookies }) => {
	const session = cookies.get("__tm__session");
	if (!session) throw redirect(302, "/auth/login?from=/user/profile");
}) satisfies LayoutServerLoad;
