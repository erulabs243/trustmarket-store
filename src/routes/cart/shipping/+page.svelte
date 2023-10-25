<script lang="ts">
  import CartItem from "$lib/components/CartItem.svelte";
    import { displayCurrency } from "$lib/utils/lang";
    import { superForm } from "sveltekit-superforms/client";
import type { PageData } from "./$types";
    import { IconBuildingBank, IconMapPin, IconPhone, IconPlus, IconTarget, IconUser } from "@tabler/icons-svelte";
    import { addressSchema } from "$lib/schemas/storeSchema";
  
  export let data: PageData;

  let {cart, addresses} = data;

  const {form, enhance, errors, message} = superForm(data.form, {
    validators: addressSchema
  });
  
</script>

<h1>Shipping</h1>

<main class="flex gap-12">

    <!-- SHIPPING SECTION -->
    <section class="w-2/3 p-12">
    {#if addresses.length > 0}
    	{#each addresses as address}
      	<div class="alert">{address.city}</div>
      {/each}
    {/if}

    <button class="btn btn-primary rounded-3xl my-4" on:click={() => document.querySelector("#addressForm").showModal()}>
      <IconPlus />
      <span>Nouvelle adresse</span>
    </button>

    <dialog id="addressForm" class="modal">
      <div class="modal-box w-11/12 max-w-3xl">
    <form method="post" action="/cart/shipping?/add" use:enhance>
      <h3>Nouvelle adresse de livraison</h3>
      <div class="flex flex-col gap-4">
          <div class="flex gap-4 items-center w-full">
            <div class="form-control w-1/2">
              <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconUser />
                <input
                  type="text"
                  name="first_name"
                  class="input w-full focus:outline-none px-0"
                  placeholder="Nom"
                  bind:value={$form.first_name}
                />
              </div>
              {#if $errors.first_name}
              	<p class="label">
                  <span class="label-text-alt text-red-500">{$errors.first_name}</span>
                </p>
              {/if}
            </div>
            <div class="form-control w-1/2">
              <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconUser />
                <input
                  type="text"
                  name="last_name"
                  class="input w-full focus:outline-none px-0"
                  placeholder="Prénom"
                  bind:value={$form.last_name}
                />
              </div>
              {#if $errors.last_name}
              	<p class="label">
                  <span class="label-text-alt text-red-500">{$errors.last_name}</span>
                </p>
              {/if}
            </div>
          </div>
          <div class="flex gap-4 w-full">
            <div class="form-control w-1/2">
              <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconMapPin />
                <input
                  type="text"
                  name="address_1"
                  class="input w-full focus:outline-none px-0"
                  placeholder="Adress principale"
                  bind:value={$form.address_1}
                />
              </div>
              {#if $errors.address_1}
              	<p class="label">
                  <span class="label-text-alt text-red-500">{$errors.address_1}</span>
                </p>
              {/if}
            </div>
            <div class="form-control w-1/2">
              <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconMapPin />
                <input
                  type="text"
                  name="country_code"
                  class="input w-full focus:outline-none px-0"
                  placeholder="Pays"
                  bind:value={$form.country_code}
                />
              </div>
              {#if $errors.country_code}
              	<p class="label">
                  <span class="label-text-alt text-red-500">{$errors.country_code}</span>
                </p>
              {/if}
            </div>
          </div>
          <div class="flex gap-4 w-full">
            <div class="form-control w-1/2">
              <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconMapPin />
                <input
                  type="text"
                  name="Ville"
                  class="input w-full focus:outline-none px-0"
                  placeholder="Ville"
                  bind:value={$form.city}
                />
              </div>
              {#if $errors.city}
              	<p class="label">
                  <span class="label-text-alt text-red-500">{$errors.city}</span>
                </p>
              {/if}
            </div>
            <div class="form-control w-1/2">
              <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconMapPin />
                <input
                  type="text"
                  name="province"
                  class="input w-full focus:outline-none px-0"
                  placeholder="Province"
                  bind:value={$form.province}
                />
              </div>
              {#if $errors.province}
              	<p class="label">
                  <span class="label-text-alt text-red-500">{$errors.province}</span>
                </p>
              {/if}
            </div>
          </div>
            <div class="form-control hidden">
              <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconTarget />
                <input
                  type="text"
                  name="postal_code"
                  class="input w-full focus:outline-none px-0"
                  placeholder="Code"
                  bind:value={$form.postal_code}
                />
              </div>
            </div>
          <div class="flex gap-4 w-full">
            <div class="form-control w-1/2">
              <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconPhone />
                <input
                  type="tel"
                  name="phone"
                  class="input w-full focus:outline-none px-0"
                  placeholder="+243970000000"
                  bind:value={$form.phone}
                />
              </div>
              {#if $errors.phone}
              	<p class="label">
                  <span class="label-text-alt text-red-500">{$errors.phone}</span>
                </p>
              {/if}
            </div>
            <div class="form-control w-1/2">
              <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconBuildingBank />
                <input
                  type="text"
                  name="company"
                  class="input w-full focus:outline-none px-0"
                  placeholder="Entreprise"
                  bind:value={$form.company}
                />
              </div>
              {#if $errors.company}
              	<p class="label">
                  <span class="label-text-alt text-red-500">{$errors.company}</span>
                </p>
              {/if}
            </div>
          </div>
          <button class="btn btn-secondary rounded-3xl mx-auto my-4">
            Enregistrer l'adresse
          </button>
      </div>
    </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </section>
  <!-- END SHIPPING SECTION -->
  
  <!-- CART SECTION -->
  <section class="w-1/3 rounded-3xl bg-base-200 p-12">
    <div class="my-4">
      {#each cart.cart.items as item}
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
        <p>{displayCurrency(cart.cart.subtotal)}</p>
      </div>
      <div class="flex items-center justify-between">
        <p>Frais de livraison</p>
        <p>{displayCurrency(cart.cart.shipping_total)}</p>
      </div>
      <div class="flex flex-items-center justify-between border-b pb-4">
        <p>Taxes</p>
        <p class="text-right">{displayCurrency(cart.cart.tax_total)}</p>
      </div>
      <div class="flex items-center justify-between">
        <p class="text-lg uppercase">Total</p>
        <p class="text-right text-lg font-bold">{displayCurrency(cart.cart.total)}</p>
      </div>
    </div>
  </section>
  <!-- END CART SECTION -->
</main>
