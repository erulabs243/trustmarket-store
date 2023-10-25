<script lang="ts">
  import CartItem from "$lib/components/CartItem.svelte";
  import { displayCurrency } from "$lib/utils/lang";
  import { IconAlertTriangle, IconArrowRight, IconShoppingBag } from "@tabler/icons-svelte";
  import type { PageData } from "./$types";
  import userStore from "$lib/stores/user";
  import Login from "$lib/components/Login.svelte";

  export let data: PageData;

  console.log(data.cart);

  $: cart = data.cart;
  $: user = data.user;
</script>

<div>
  <h1>Mon panier</h1>
  {#if !cart}
    <div class="alert alert-warning">
      <p>Aucun produit dans votre panier</p>
</div>
  {:else if cart && cart.cart.items.length === 0}
    <div class="flex flex-col gap-4 items-center">
      <div class="alert alert-warning">
        <IconAlertTriangle />
        <span
          >Ajouter des produits dans votre panier pour passer une commande</span
        >
      </div>
      <a href="/store/collections" class="btn btn-primary rounded-3xl"
        >Voir nos produits</a
      >
    </div>
  {:else}
    <div class="p-12 bg-base-200 rounded-3xl">
      <header class="flex gap-4 items-center bg-base-200 py-4 border-b">
        <div class="w-40" />
        <div class="w-2/6">
          <p>Produit</p>
        </div>
        <div class="w-1/6">
          <p>Modèle</p>
        </div>
        <div class="w-1/6">
          <p>Quantité</p>
        </div>
        <div class="w-1/6">
          <p>Supprimer</p>
        </div>
        <div class="w-1/6">
          <p>Prix</p>
        </div>
      </header>
      {#each cart.cart.items as item}
        <CartItem {item} />
      {/each}
      <footer>
        <div class="flex gap-8 items-center bg-base-200 py-4 border-t">
          <div
            class="w-1/4 flex items-center justify-between p-4 border border-gray-400 rounded-xl"
          >
            <p>Taxes</p>
            <p>{displayCurrency(cart.cart.tax_total)}</p>
          </div>
          <div
            class="w-1/4 flex items-center justify-between p-4 border rounded-xl border-gray-400"
          >
            <p>Livraison</p>
            <p>{displayCurrency(cart.cart.shipping_total)}</p>
          </div>
          <div
            class="w-1/4 flex items-center justify-between p-4 border rounded-xl border-gray-400"
          >
            <p>Sous-total</p>
            <p>{displayCurrency(cart.cart.subtotal)}</p>
          </div>
          <div
            class="w-1/4 flex items-center justify-between p-4 rounded-xl border border-gray-400"
          >
            <p class="font-bold uppercase">Total</p>
            <p class="font-bold">{displayCurrency(cart.cart.total)}</p>
          </div>
        </div>
        <nav class="w-full my-4 flex items-center justify-end gap-8">
          <a
            href="/store/collections"
            class="btn btn-outline btn-secondary rounded-3xl"
            >Continuer les achats</a
          >
          {#if !$userStore}
            <Login label="Commander maintenant" from="cart" />
          {:else}
            <a href="/cart/shipping" class="btn btn-primary rounded-3xl">
              Adresse de livraison
              <IconArrowRight />
            </a>
          {/if}
        </nav>
      </footer>
    </div>
  {/if}
</div>
