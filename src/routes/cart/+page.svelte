<script lang="ts">
  import CartItem from "$lib/components/CartItem.svelte";
  import { displayCurrency } from "$lib/utils/lang";
  import { IconAlertTriangle, IconArrowRight, IconShoppingBag } from "@tabler/icons-svelte";
  import type { PageData } from "./$types";
  import { navigating } from "$app/stores";
  import userStore from "$lib/stores/user";
  import Login from "$lib/components/Login.svelte";
    import Seo from "$lib/components/Seo.svelte";

  export let data: PageData;

  $: cart = data.cart;
  $: user = data.user;
</script>

<Seo description="Mon panier" />

<main class="w-full lg:w-5/6 mx-auto">

{#if $navigating}
	<div class="alert alert-success">
    Chargement...
  </div>
{:else}

<div class="my-8 lg:my-20 px-4">
  <h1 class="text-center uppercase text-neutral font-bold lg:hidden text-xl mb-4">Mon panier</h1>
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
    <div class="px-4 py-12 lg:px-12 lg:py-12 bg-base-200 rounded-3xl">
      <header class="lg:flex hidden gap-4 items-center bg-base-200 py-4 border-b">
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
        <div class="flex flex-col lg:flex-row gap-2 lg:gap-8 items-center bg-base-200 py-4 border-t">
          <div
            class="w-full lg:w-1/4 flex items-center justify-between p-4 border border-gray-400 rounded-xl"
          >
            <p class="text-gray-700">Taxes</p>
            <p class="text-gray-700 text-right font-bold">{displayCurrency(cart.cart.tax_total)}</p>
          </div>
          <div
            class="w-full lg:w-1/4 flex items-center justify-between p-4 border rounded-xl border-gray-400"
          >
            <p class="text-gray-700">Livraison</p>
            <p class="text-gray-700 font-bold text-right">{displayCurrency(cart.cart.shipping_total)}</p>
          </div>
          <div
            class="w-full lg:w-1/4 flex items-center justify-between p-4 border rounded-xl border-gray-400"
          >
            <p class="text-gray-700">Sous-total</p>
            <p class="text-gray-700 font-bold text-right">{displayCurrency(cart.cart.subtotal)}</p>
          </div>
          <div
            class="w-full lg:w-1/4 flex items-center justify-between p-4 rounded-xl border border-gray-400"
          >
            <p class="font-bold text-gray-700 uppercase">Total</p>
            <p class="font-bold text-gray-700 text-right text-xl text-secondary">{displayCurrency(cart.cart.total)}</p>
          </div>
        </div>
        <nav class="w-full my-4 flex flex-col lg:flex-row items-center justify-center lg:justify-end gap-2 lg:gap-8">
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

{/if}

</main>
