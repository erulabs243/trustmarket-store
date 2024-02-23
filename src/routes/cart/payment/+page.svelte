<script lang="ts">
  import type { PageData } from "./$types";
  import { displayCurrency } from "$lib/utils/lang";
    import api from "$lib/apiClient";
    import { enhance } from "$app/forms";
    import { cartStore, cartTotalStore } from "$lib/stores/cart";
    import { goto } from "$app/navigation";
  import { navigating } from "$app/stores";
    import Seo from "$lib/components/Seo.svelte";
    import { URL } from "$lib/constants";

  export let data: PageData;
  let provider: string;
  let processing: boolean = false;
  let toComplete: boolean = false;
  let completeLoading: boolean = false;
  let error: string = "";

  const { cart } = data.cart;
  const handlePayment = async (cart: string, id: string) => {
    processing = true;
    provider = id;

    try {
      await api.post(`carts/${cart}/payment-session`, {
    json: { provider_id: id },
    credentials: "include",
  }).json();

      toComplete = true;
      processing = false;    
      
    } catch (error) {

      // TODO display error messages
      console.log(error);
      processing = false;
    }
  };

</script>

<Seo description="Mode de paiement" url={`${URL}/cart/payment`}/>

<main class="w-screen lg:w-5/6 mx-auto">

{#if $navigating}
	<div class="alert alert-success">
      Chargement...
  </div>
{:else}

<main class="flex flex-col lg:flex-row gap-8 lg:gap-12 my-8 lg:my-12">
  <h1 class="text-center font-bold lg:hidden uppercase text-gray-700 text-xl">Paiement</h1>
    
  <!-- SUMMARY SECTION -->
  <section class="flex flex-col gap-4 lg:gap-8 w-full lg:w-2/3 p-4 lg:p-12">
    <!-- SHIPPING ADDRESS-->
    <div class="border rounded-xl px-8 py-4 border-gray-300">
      <p class="font-bold mb-4">Adresse de livraison</p>
      <div class="flex flex-col gap-2 lg:gap-4">
        <div class="flex flex-col lg:flex-row">
          <p class="text-gray-700 text-sm">Nom complet</p>
        <p class="text-gray-700 font-bold">{`${cart.shipping_address?.first_name} ${cart.shipping_address?.last_name}`}</p>
        </div>

        <div class="flex flex-col lg:flex-row">
          <p class="text-gray-700 text-sm">Numéro de téléphone</p>
        <p class="text-gray-700 font-bold">{`${cart.shipping_address?.phone}`}</p>
        </div>

        <div class="flex flex-col lg:flex-row">
          <p class="text-gray-700">Adresse, ville</p>
        <p class="text-gray-700 font-bold">{`${cart.shipping_address?.address_1}, ${cart.shipping_address?.city}`}</p>
        </div>

        <div class="flex flex-col lg:flex-row">
        <p class="text-gray-700">Province, pays</p>
        <p class="font-bold text-gray-700">{`${cart.shipping_address?.province}, ${cart.shipping_address?.country?.display_name}`}</p>
        </div>
      </div>
    </div>
    <!-- END SHIPPING ADDRESS -->

    <!-- SHIPPING METHOD -->
    <div class="border rounded-xl px-8 y-4 border-gray-300 py-2">
      <p class="text-gray-700 text-s,">Mode de livraison</p>
      <div class="flex flex-col gap-4">
        {#each cart.shipping_methods as method}
        	<p class="font-bold text-gray-700">{method.shipping_option?.name}</p>
        {/each}
      </div>
    </div>
    <!-- END SHIPPING METHOD -->

    <!-- PAYMENT METHOD -->
    <div class="px-4 my-4">
        <p class="text-center lg:text-left text-gray-700">Choisissez un mode de paiement pour finaliser la commande</p>
    <div class="flex gap-4 my-4 justify-center flex-col lg:flex-row">
      {#each cart.payment_sessions as payment}
      	<button class={`btn rounded-3xl ${processing ? "btn-disabled" : ""} ${provider === payment.provider_id ? "btn-solid btn-accent" : "btn-outline btn-secondary"}`} on:click={() => handlePayment(cart.id, payment.provider_id)}>
          {#if processing}
          	<span class="loading loading-spinner" />
          {/if}
          {payment.provider_id === "manual" ? "Paimenent à la livraison" : ""}
        </button>
      {/each}
    </div>
    </div>
    <!-- END PAYMENT METHOD -->
    {#if toComplete}
    <form method="post" action="?/complete" use:enhance={() => {
          completeLoading = true;
        
          return async({ result }) => {
          if(result.status === 200) {
            $cartStore = [];
            $cartTotalStore = 0;
            completeLoading = false;
            goto("/cart/success");
        } else {
          error = "Impossible de passer votre commande. Veuillez réessayer";
          completeLoading = false;
        }
        }
        }}>
    <div class="w-full flex justify-center">
        {#if error}
        	<div class="alert alert-error my-4">
            {error}
          </div>
        {/if}
      <button class={`btn btn-primary rounded-3xl btn-block ${completeLoading ? "btn-disabled" : ""}`} type="submit">
              {#if completeLoading}
              	<span class="loading loading-spinner" />
              {/if}
              Confirmer ma commander
            </button>
    </div>
    </form>
        {/if}
  </section>
  <!-- END SUMMARY SECTION -->
  
  <!-- CART SECTION -->
  <section class="w-full lg:w-1/3 rounded-3xl bg-base-200 p-8 lg:p-12 mx-4">
    <div class="my-4 flex flex-col gap-2">
      {#each cart.items as item}
        <article class="flex gap-4 items-center">
          <figure>
            <img src={item.thumbnail} alt={item.title} class="rounded-xl w-16 h-16 object-cover" />
          </figure>
          <div>
            <p class="uppercase text-gray-700">{item.title} <span class="badge badge-secondary badge-sm ml-2">{item.variant?.title}</span></p>
            <p class="font-bold">{displayCurrency(item.total)} <span class="text-sm font-normal ml-1">{`(${item.quantity} item${item.quantity > 1 ? "s" : ""})`}</span></p>
          </div>
        </article>
      {/each}
    </div>

    <div class="flex flex-col gap-4 bg-base-100 rounded-xl px-8 py-4">
      <div class="flex items-center justify-between">
        <p class="text-gray-700">Sous-total</p>
        <p class="text-gray-700 text-right font-bold">{displayCurrency(cart.subtotal)}</p>
      </div>
      <div class="flex items-center justify-between">
        <p class="text-gray-700">Frais de livraison</p>
        <p class="text-gray-700 text-right font-bold">{displayCurrency(cart.shipping_total)}</p>
      </div>
      <div class="flex flex-items-center justify-between border-b pb-4">
        <p class="text-gray-700">Taxes</p>
        <p class="text-right text-gray-700 font-bold">{displayCurrency(cart.tax_total)}</p>
      </div>
      <div class="flex items-center justify-between">
        <p class="text-lg uppercase text-gray-700">Total</p>
        <p class="text-right text-lg font-bold text-secondary">{displayCurrency(cart.total)}</p>
      </div>
    </div>
  </section>
  <!-- END CART SECTION -->
</main>

{/if}
</main>
