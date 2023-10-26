<script lang="ts">
  import type { PageData } from "./$types";
  import { displayCurrency } from "$lib/utils/lang";
    import api from "$lib/apiClient";
    import { enhance } from "$app/forms";
    import { cartStore, cartTotalStore } from "$lib/stores/cart";
    import { goto } from "$app/navigation";

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


<main class="flex gap-12 my-12">

  <!-- SUMMARY SECTION -->
  <section class="flex flex-col gap-8 w-2/3 p-12">
    <!-- SHIPPING ADDRESS-->
    <div class="border rounded-xl px-8 py-4">
      <p>Adresse de livraison</p>
      <div class="flex flex-col gap-4">
        <p>{`${cart.shipping_address?.first_name} ${cart.shipping_address?.last_name}`}</p>
        <p>{`${cart.shipping_address?.phone}`}</p>
        <p>{`${cart.shipping_address?.address_1}, ${cart.shipping_address?.city}`}</p>
        <p>{`${cart.shipping_address?.province}, ${cart.shipping_address?.country?.display_name}`}</p>
      </div>
    </div>
    <!-- END SHIPPING ADDRESS -->

    <!-- SHIPPING METHOD -->
    <div class="border rounded-xl px-8 y-4">
      <p>Mode de livraison</p>
      <div class="flex flex-col gap-4">
        {#each cart.shipping_methods as method}
        	<p>{method.shipping_option?.name}</p>
        {/each}
      </div>
    </div>
    <!-- END SHIPPING METHOD -->

    <!-- PAYMENT METHOD -->
    <div>
        <p>Choisissez un mode de paiement pour finaliser la commande</p>
    <div class="flex gap-4">
      {#each cart.payment_sessions as payment}
      	<button class={`btn btn-secondary rounded-3xl ${processing ? "btn-disabled" : ""} ${provider === payment.provider_id ? "btn-solid" : "btn-outline"}`} on:click={() => handlePayment(cart.id, payment.provider_id)}>
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
      <button class={`btn btn-primary rounded-3xl btn-lg ${completeLoading ? "btn-disabled" : ""}`} type="submit">
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
  <section class="w-1/3 rounded-3xl bg-base-200 p-12">
    <div class="my-4">
      {#each cart.items as item}
        <article class="flex gap-4 items-center">
          <figure>
            <img src={item.thumbnail} alt={item.title} class="rounded-xl w-16 h-16 object-cover" />
          </figure>
          <div>
            <p>{item.title} <span class="badge badge-secondary badge-sm ml-2">{item.variant?.title}</span></p>
            <p>{displayCurrency(item.total)} <span class="text-sm ml-1">{`(${item.quantity} item${item.quantity > 1 ? "s" : ""})`}</span></p>
          </div>
        </article>
      {/each}
    </div>

    <div class="flex flex-col gap-4 bg-base-100 rounded-xl px-8 py-4">
      <div class="flex items-center justify-between">
        <p>Sous-total</p>
        <p>{displayCurrency(cart.subtotal)}</p>
      </div>
      <div class="flex items-center justify-between">
        <p>Frais de livraison</p>
        <p>{displayCurrency(cart.shipping_total)}</p>
      </div>
      <div class="flex flex-items-center justify-between border-b pb-4">
        <p>Taxes</p>
        <p class="text-right">{displayCurrency(cart.tax_total)}</p>
      </div>
      <div class="flex items-center justify-between">
        <p class="text-lg uppercase">Total</p>
        <p class="text-right text-lg font-bold">{displayCurrency(cart.total)}</p>
      </div>
    </div>
  </section>
  <!-- END CART SECTION -->
</main>
