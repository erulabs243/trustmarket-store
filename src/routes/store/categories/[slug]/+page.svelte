<script lang="ts">
  import ProductCard from "$lib/components/ProductCard.svelte";
  import type { PageData } from "./$types";
  import { navigating } from "$app/stores";
    import Seo from "$lib/components/Seo.svelte";
    import { URL } from "$lib/constants";

  export let data: PageData;
  export let { empty, category, products } = data;
</script>

<Seo 
  description={category.description ?? category.name} 
  url={`${URL}/store/categories/${category.handle}`}
/>

<main class="w-screen lg:w-5/6 mx-auto">

{#if $navigating}
	<div class="alert alert-success">
    Chargement...
  </div>
{:else}

<div class="flex flex-col gap-12 lg:gap-24 my-8 lg:my-24">
  <header class="bg-gradient-to-br from-red-300 to-orange-300 mx-4 lg:mx-0 py-12 lg:py-24 rounded-3xl">
  <h1 class="text-center uppercase text-neutral text-xl lg:text-4xl font-bold">{category.name}</h1>
  	<p class="text-gray-700 text-center px-8 text-lg lg:text-xl mt-4 w-full lg:w-xs mx-auto">{category.description}</p>
    </header>
  <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4">
    {#each products.products as product}
      <ProductCard {product} />
    {/each}
  </section>
</div>

{/if}
</main>
