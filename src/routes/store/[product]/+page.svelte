<script lang="ts">
  import ProductCard from "$lib/components/ProductCard.svelte";
  import { displayCurrency } from "$lib/utils/lang";
  import { IconInfoCircle, IconShoppingBagPlus } from "@tabler/icons-svelte";
  import type { PageData } from "./$types";
  import { superForm } from "sveltekit-superforms/client";
  import { addToCartSchema } from "$lib/schemas/storeSchema";
  import { cartStore, cartTotalStore } from "$lib/stores/cart";
    import type { CartStoreItem } from "$lib/types/commons";

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

<!-- PRODUCT -->
<section>
  <h1>
    {product.title}
  </h1>
  <div class="flex gap-12">
    <aside class="flex gap-4 flex-1">
      <div class="flex flex-col gap-2">
        {#each product.images as img, id}
          <button
            on:click={() => changeImage(id)}
            on:keydown={() => changeImage(id)}
          >
            <img
              src={img.url}
              alt={product.title}
              class="rounded-xl h-28 hover:cursor-pointer"
            />
          </button>
        {/each}
      </div>
      <img
        src={product.images[image].url}
        alt={product.title}
        class="rounded-xl h-96 object-cover"
      />
    </aside>
    <aside class="flex flex-col gap-4 flex-1">
      <h2>{product.title}</h2>
      <div class="flex items-center">
        <p>
          <span
            >{displayCurrency(product.variants[variant].prices[0].amount)}</span
          >
          <!-- TODO setting product discount -->
        </p>
      </div>
      {#if product.description}
        <p>{product.description}</p>
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
        <p>
          <span>Collection</span>
          <a
            href={`/store/collections/${product.collection.handle}`}
            class="btn btn-outline btn-sm btn-secondary rounded-xl"
            >{product.collection.title}</a
          >
        </p>
      {/if}

      <div>
        <p>Modèles</p>
        <nav class="join flex-wrap gap-2">
          {#each product.variants as model, id}
            <button
              class={`btn ${
                variant !== id ? "btn-outline btn-neutral" : "btn-primary"
              } rounded-xl`}
              on:click={() => changeVariant(id)}
            >
              {model.title}
            </button>
          {/each}
        </nav>
      </div>
      <form method="post" use:enhance>
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
        <div class="flex items-end gap-4">
          <div class="form-control w-1/3">
            {#if $errors.quantity}
              <label class="label" for="quantity">
                <span class="label-text-alt text-red-500">
                  {$errors.quantity}
                </span>
              </label>
            {/if}
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
<div class="flex flex-col gap-12 my-24">
  <header>
    <h4>Ils pourraient vous intéresser...</h4>
  </header>
  <section class="grid grid-cols-6 gap-4">
    {#each related as product}
      <ProductCard {product} />
    {/each}
  </section>
</div>
<!-- END RELATED BY COLLECTION -->
