import type { LineItemType } from "$lib/types/apiType";
import { writable } from "svelte/store";

const cartStore = writable<Array<LineItemType>>([]);
const cartTotalStore = writable<number>(0);

export { cartStore, cartTotalStore };
