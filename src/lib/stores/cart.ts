
import { browser } from "$app/environment";
import type { CartType, LineItemType } from "$lib/types/apiType";
import { writable } from "svelte/store";

//const cartStore = writable<string>("");

//cartStore.subscribe(
 // (val) => browser && sessionStorage.setItem("cart", val)
//);

const cartStore = writable<string>("");

cartStore.subscribe(
  (cart) => browser && sessionStorage.setItem("cart", cart)
);

export default cartStore;