<script lang="ts">
  import ProductCard from "$lib/components/ProductCard.svelte";
  import type { PageData } from "./$types";
  import { navigating } from "$app/stores";

  export let data: PageData;
  export let { empty, collection, products } = data;
</script>

<main class="w-screen lg:w-5/6 mx-auto">

{#if $navigating}
	<div class="alert alert-success">
    Chargement...
  </div>
{:else}

<div class="flex flex-col gap-12 lg:gap-24 my-8 lg:my-24">
  <header>
  <h1 class="text-center uppercase text-neutral text-xl lg:text-2xl font-bold">{collection.title}</h1>
  {#if collection.metadata?.description}
  	<p class="text-gray-700 text-center px-8">{collection.metadata.description}</p>
  {/if}
    </header>
  <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4">
    {#each products.products as product}
      <ProductCard {product} />
    {/each}
  </section>
</div>

{/if}
</main>
