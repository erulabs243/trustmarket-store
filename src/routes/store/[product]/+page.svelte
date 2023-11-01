<script lang="ts">
  import ProductCard from "$lib/components/ProductCard.svelte";
  import { displayCurrency } from "$lib/utils/lang";
  import { IconInfoCircle, IconShoppingBagPlus } from "@tabler/icons-svelte";
  import type { PageData } from "./$types";
  import { superForm } from "sveltekit-superforms/client";
  import { addToCartSchema } from "$lib/schemas/storeSchema";
  import { cartStore, cartTotalStore } from "$lib/stores/cart";
  import { navigating } from "$app/stores";

  export let data: PageData;
  export let { product, related } = data;
  export let variant: number = 0;
  export let image: number = 0;

  const { form, errors, enhance, message, delayed } = superForm(data.form, {
    validators: addToCartSchema,
    onSubmit: ({ formData }) => {
      formData.set("variant", product.variants[variant].id);
    },
    onResult: ({result}) => {
      if(result.status === 200) {
        const { message, data } = result.data.form;
        $cartStore = message.cart.items;
        $cartTotalStore = Number(message.cart.total);
      }
    }
  });

  const changeVariant = (id: number) => (variant = id);
  const changeImage = (id: number) => (image = id);
</script>


{#if $navigating}
	<div class="alert alert-success">
    Chargement...
  </div>
{:else}
<!-- PRODUCT -->
<section class="my-8 lg:my-12 px-4">
  <h1 class="text-center uppercase font-bold text-neutral lg:hidden mb-4 text-lg">
    {product.title}
  </h1>
  <div class="flex flex-col lg:flex-row gap-12">
    <aside class="flex flex-col-reverse lg:flex-row gap-4 flex-1">
      <div class="flex flex-row justify-center lg:justify-start lg:flex-col gap-2">
        {#each product.images as img, id}
          <button
            on:click={() => changeImage(id)}
            on:keydown={() => changeImage(id)}
          >
            <figure class={`bg-base-100 p-0 rounded-xl ${image === id ? "border-2 border-gray-700" : ""}`}>
            <img
              src={img.url}
              alt={product.title}
              class="rounded-xl h-20 w-20 lg:h-24 lg:w-24 object-cover hover:cursor-pointer"
            />
</figure>
          </button>
        {/each}
      </div>
      <figure class="bg-base-300 p-0 rounded-xl w-full">
      <img
        src={product.images[image].url}
        alt={product.title}
        class="rounded-xl h-48 w-full lg:h-96 object-cover mx-auto"
      />
      </figure>
    </aside>
    <aside class="flex flex-col gap-2 lg:gap-4 flex-1">
      <h2 class="text-xl text-neutral">{product.title}</h2>
      <div class="flex items-center">
        <p>
          <span class="font-bold text-2xl text-neutral"
            >{displayCurrency(product.variants[variant].prices[0].amount)}</span
          >
          <!-- TODO setting product discount -->
        </p>
      </div>
      {#if product.description}
        <p class="text-gray-500 leading-tight lg:leading-normal mb-2">{product.description}</p>
      {/if}

      {#if product.categories && product.categories.length > 0}
        <div>
          <p>Catégories</p>
          <nav class="join gap-2">
            {#each product.categories as category}
              <a
                href={`/store/categories/${category.handle}`}
                class="btn btn-outline btn-secondary btn-sm rounded-xl"
                >{category.name}</a
              >
            {/each}
          </nav>
        </div>
      {/if}

      {#if product.collection_id}
        <div class="flex gap-2 items-center">
          <p class="text-gray-700">Collection</p>
          <a
            href={`/store/collections/${product.collection.handle}`}
            class="btn btn-outline btn-sm btn-neutral rounded-3xl"
            >{product.collection.title}</a
          >
        </div>
      {/if}

      <div class="flex flex-col lg:flex-row gap-1">
        <p class="text-gray-700">Modèles</p>
        <nav class="join flex-wrap gap-2">
          {#each product.variants as model, id}
            <button
              class={`btn ${
                variant !== id ? "btn-outline btn-neutral" : "btn-accent ring ring-offset-1 ring-orange-400"
              } rounded-xl`}
              on:click={() => changeVariant(id)}
            >
              {model.title}
            </button>
          {/each}
        </nav>
      </div>
      <form method="post" class="my-4" use:enhance>
        {#if $message}
          <div
            class={` my-4 alert ${
              $message.status == "error" ? "alert-error" : "alert-success"
            }`}
          >
            <IconInfoCircle />
            <span>{$message.text}</span>
          </div>
        {/if}
            {#if $errors.quantity}
              <label class="label" for="quantity">
                <span class="label-text-alt text-base text-red-500">
                  {$errors.quantity}
                </span>
              </label>
            {/if}
        <div class="flex items-end gap-4">
          <div class="form-control w-1/3">
            <input
              type="number"
              class={`input input-bordered rounded-3xl ${
                $errors.quantity ? "input-error" : ""
              }`}
              name="quantity"
              bind:value={$form.quantity}
            />
          </div>
          <button
            type="submit"
            class={`btn btn-primary w-2/3 rounded-3xl ${
              $delayed ? "btn-disabled" : ""
            }`}
          >
            Ajouter au panier
            {#if $delayed}
              <span class="loading loading-spinner" />
            {:else}
              <IconShoppingBagPlus />
            {/if}
          </button>
        </div>
      </form>
    </aside>
  </div>
</section>
<!-- END PRODUCT -->

<!-- RELATED BY COLLECTION -->
<div class="flex flex-col gap-8 lg:gap-12 my-8 lg:my-24 px-4">
  <header>
    <h4 class="text-xl lg:text-2xl font-bold">Ils pourraient vous intéresser...</h4>
  </header>
  <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
    {#each related as product}
      <ProductCard {product} />
    {/each}
  </section>
</div>
<!-- END RELATED BY COLLECTION -->

{/if}
