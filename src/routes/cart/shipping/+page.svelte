<script lang="ts">
    import { displayCurrency } from "$lib/utils/lang";
    import { superForm } from "sveltekit-superforms/client";
import type { PageData } from "./$types";
    import { IconBuildingBank, IconMapPin, IconPhone, IconPlus, IconTarget, IconUser } from "@tabler/icons-svelte";
    import { addressSchema } from "$lib/schemas/storeSchema";
    import type { ShippingMethodType, } from "$lib/types/apiType";
    import { goto, invalidateAll } from "$app/navigation";
    import api from "$lib/apiClient";
    import type { CartRes } from "$lib/types/apiResponse";
    import { HTTPError } from "ky";
  
  export let data: PageData;
  let loading: boolean = false;

  let {cart, addresses, options} = data;

  const {form, enhance, errors, message, delayed} = superForm(data.form, {
    validators: addressSchema,
    onResult: ({ result }) => {
    console.log(result);
  
      if(result.status === 200) {
        document.querySelector("#addressForm").close();
        invalidateAll();
      }
    }
  });

  //Handle shipping option
  const handleShipping = async (option: string) => {
    try {
      loading = true;
      const res = (await api.post(`carts/${cart.cart.id}/shipping-methods`, {
      json: { option_id: option },
      credentials: "include"
    }).json()) as CartRes;

    loading = false;
    goto("/cart/payment");
    } catch (error) {
    if(error instanceof HTTPError){
    console.log(error.response);
  } 
    console.log(error);
    loading = false;
  }
  }
  
</script>

    <h1 class="text-center font-bold uppercase text-neutral lg:hidden my-8">Adresse de livraison</h1>
<main class="flex flex-col-reverse lg:flex-row gap-4 lg:gap-12 my-8 lg:my-12">

    <!-- SHIPPING SECTION -->
    <section class="w-full lg:w-2/3 py-4 px-4 lg:p-12">
    {#if addresses.length > 0}
    	{#each addresses as address}
      	<div class="alert">{address.city}</div>
      {/each}
    {/if}

    <button class="btn btn-primary btn-block rounded-3xl my-4" on:click={() => document.querySelector("#addressForm").showModal()}>
      <IconPlus />
      <span>Nouvelle adresse</span>
    </button>

    <dialog id="addressForm" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box w-full max-w-3xl">
    <form method="post" action="/cart/shipping?/add" use:enhance>
      <h3 class="uppercase font-bold my-4 text-gray-700 ">Nouvelle adresse de livraison</h3>
      <div class="flex flex-col gap-4 mt-8 lg:mt-0">
            {#if $message }
              <div class={`alert my-4 ${$message.status === "error" ? "alert-error" : "alert-success"}`}>
                {$message.text}
              </div>            	
            {/if}
          <div class="flex flex-col lg:flex-row gap-2 lg:gap-4 items-center w-full">
            <div class="form-control w-full lg:w-1/2">
              <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconUser />
                <input
                  type="text"
                  name="first_name"
                  class="input w-full bg-white focus:outline-none px-0"
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
            <div class="form-control w-full lg:w-1/2">
              <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconUser />
                <input
                  type="text"
                  name="last_name"
                  class="input w-full bg-white focus:outline-none px-0"
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
          <div class="flex flex-col lg:flex-row gap-2 lg:gap-4 items-center w-full">
            <div class="form-control w-full lg:w-1/2">
              <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconMapPin />
                <input
                  type="text"
                  name="address_1"
                  class="input w-full bg-white focus:outline-none px-0"
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
            <div class="form-control w-full lg:w-1/2">
              <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconMapPin />
                <input
                  type="text"
                  name="country_code"
                  class="input w-full bg-white focus:outline-none px-0"
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
          <div class="flex flex-col lg:flex-row gap-2 lg:gap-4 items-center w-full">
            <div class="form-control w-full lg:w-1/2">
              <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconMapPin />
                <input
                  type="text"
                  name="city"
                  class="input w-full bg-white focus:outline-none px-0"
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
            <div class="form-control w-full lg:w-1/2">
              <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconMapPin />
                <input
                  type="text"
                  name="province"
                  class="input w-full bg-white focus:outline-none px-0"
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
          <div class="flex flex-col lg:flex-row gap-2 lg:gap-4 items-center w-full">
            <div class="form-control w-full lg:w-1/2">
              <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconPhone />
                <input
                  type="tel"
                  name="phone"
                  class="input w-full bg-white focus:outline-none px-0"
                  placeholder="+243970000000"
                  bind:value={$form.phone}
                />
              </div>
              {#if $errors.phone}
              	<p class="label">
                  <span class="label-text-alt text-red-500">Numéro de téléphone invalide</span>
                </p>
              {/if}
            </div>
            <div class="form-control w-full lg:w-1/2">
              <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconBuildingBank />
                <input
                  type="text"
                  name="company"
                  class="input w-full bg-white focus:outline-none px-0"
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
          <button type="submit" class={`btn btn-primary rounded-3xl mx-auto my-4 ${$delayed ? "btn-disabled" : ""}`}>
            {#if $delayed}
            	<span class="loading loading-spinner" />
            {/if}
            Enregistrer l'adresse
          </button>
      </div>
    </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
    </dialog>

    <!-- SHIPPING METHODS -->

    <!-- TODO Show errors when occuring -->
    {#if loading}
    	<div class="alert alert-warning">
        <p>Traitement en cours</p>
      </div>
    {/if}
    {#if options && options.shipping_options.length > 0}
    	<div>
        {#each options.shipping_options as option}
        	<button class="btn btn-outline rounded-xl btn-block rounded-3xl" on:click={() => handleShipping(option.id)}>
            {option.name}
          </button>
        {/each}
      </div>
    {/if}
    <!-- END SHIPPING METHODS -->
    
  </section>
  <!-- END SHIPPING SECTION -->
  
  <!-- CART SECTION -->
  <section class="w-full lg:w-1/3 rounded-3xl bg-base-200 p-8 lg:p-12 mx-4">
    <div class="flex flex-col gap-2 my-4">
      {#each cart.cart.items as item}
        <article class="flex gap-4 items-center">
          <figure>
            <img src={item.thumbnail} alt={item.title} class="rounded-xl w-16 h-16 object-cover" />
          </figure>
          <div>
            <p>{item.title} <span class="badge badge-secondary badge-sm ml-2">{item.variant?.title}</span></p>
            <p class="font-bold">{displayCurrency(item.total)} <span class="text-sm ml-1 font-normal">{`(${item.quantity} item${item.quantity > 1 ? "s" : ""})`}</span></p>
          </div>
        </article>
      {/each}
    </div>

    <div class="flex flex-col gap-4 bg-base-100 rounded-xl px-8 py-4">
      <div class="flex items-center justify-between">
        <p class="text-gray-700">Sous-total</p>
        <p class="text-gray-700 font-bold text-right">{displayCurrency(cart.cart.subtotal)}</p>
      </div>
      <div class="flex items-center justify-between">
        <p class="text-gray-700">Frais de livraison</p>
        <p class="font-bold text-gray-700 text-right">{displayCurrency(cart.cart.shipping_total)}</p>
      </div>
      <div class="flex flex-items-center justify-between border-b pb-4">
        <p class="text-gray-700">Taxes</p>
        <p class="font-bold text-gray-700 text-right">{displayCurrency(cart.cart.tax_total)}</p>
      </div>
      <div class="flex items-center justify-between">
        <p class="text-lg text-gray-700 uppercase">Total</p>
        <p class="text-right text-lg text-secondary font-bold">{displayCurrency(cart.cart.total)}</p>
      </div>
    </div>
  </section>
  <!-- END CART SECTION -->
</main>
