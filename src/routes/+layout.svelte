<script lang="ts">
    import { page } from "$app/stores";
  import Navbar from "$lib/components/Navbar.svelte";
    import userStore from "$lib/stores/user";
    import { onDestroy } from "svelte";
  import "../app.css";
  import type { LayoutData } from "./$types";
    import { cartStore, cartTotalStore } from "$lib/stores/cart";

  export let data: LayoutData;

  const unsubcribe = userStore.subscribe(() => null);
  const unsubscribeCart = cartStore.subscribe(() => null);
  const unsubscribeTotal = cartTotalStore.subscribe(() => null);
  onDestroy(unsubcribe);
  onDestroy(unsubscribeCart);
  onDestroy(unsubscribeTotal);

  //TODO load cart data in header
</script>

<Navbar />
<slot />
