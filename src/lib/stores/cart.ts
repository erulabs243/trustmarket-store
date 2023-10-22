import { browser } from "$app/environment";
import type { CartType, LineItemType } from "$lib/types/apiType";
import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store";

type Context = Writable<string>;
type CartStore = string;

export const setCart = (id: string) => {
  const cart = writable<CartStore>(id);
  if (browser){
    sessionStorage.setItem("cart", id);
  }
  setContext("cart", cart);
}

export const getCart = () => getContext<Context>("cart");