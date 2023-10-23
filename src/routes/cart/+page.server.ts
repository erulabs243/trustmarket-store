import api from "$lib/server/apiClient";
import type { CartRes } from "$lib/types/apiResponse";
import type { PageServerLoad } from "./$types";

export const load = (async ({cookies}) => {
    const cartId = cookies.get("__tm__cart") ?? "";
    if(!cartId) return { cart : null };

    const cart = (await api.get(`carts/${cartId}`).json()) as CartRes;
    if(!cart) return { cart : null };

    return {
      cart
    }
}) satisfies PageServerLoad;