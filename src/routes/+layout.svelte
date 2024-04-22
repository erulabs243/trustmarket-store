<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
    import userStore from "$lib/stores/user";
    import { onDestroy } from "svelte";
  import "../app.css";
  import type { LayoutData } from "./$types";
    import { cartStore, cartTotalStore } from "$lib/stores/cart";
    import type { LineItemType } from "$lib/types/apiType";
    import type { UserSession } from "$lib/types/commons";
    import Footer from "$lib/components/Footer.svelte";

  export let data: LayoutData;
  let cart: Array<LineItemType>;
  let cartTotal: number;
  let user: UserSession | null;
  let categories = data.categories;
  let annonces = data.annonces;
  
  $cartStore = data.cart?.cart.items ?? [];
  $cartTotalStore = Number(data.cart?.cart.total) ?? 0;
  $userStore = data.user ? JSON.parse(data.user) : null;

  const unsubscribeCart = cartStore.subscribe((value) => cart = value);
  const unsubscribeTotal = cartTotalStore.subscribe((value) => cartTotal = value);
  const unsubcribe = userStore.subscribe((value) => user = value);
  onDestroy(unsubcribe);
  onDestroy(unsubscribeCart);
  onDestroy(unsubscribeTotal);

  //FIXME hide submenus when route change
  //TODO load cart data in header
</script>

<div class="w-screen">

  <Navbar {categories} {annonces} />
    <slot />
  <Footer />

</div>
