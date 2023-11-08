<script lang="ts">
  import ProductCard from "$lib/components/ProductCard.svelte";
  import type { PageData } from "./$types";
  import { navigating } from "$app/stores";
    import Seo from "$lib/components/Seo.svelte";
    import { URL } from "$lib/constants";

  export let data: PageData;
//  export let { empty, category, products } = data;

  $: category = data.category;
  $: products = data.products;
  $: empty = data.empty;
</script>

<Seo 
  title={category.name}
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

      {#if category.category_children.length > 0}
        <div class="mx-auto rounded-xl lg:mx-4 bg-orange-200 w-11/12 lg:w-full">
          <h4 class="btn rounded-3xl btn-ghost mx-4 btn-sm md:hidden mt-4">Sous-catégories</h4>
      	<div class="mx-auto lg:mx-4 w-11/12 flex flex-wrap gap-2 md:gap-4 lg:w-full bg-orange-200 items-center p-4 rounded-xl">
          <h4 class="btn rounded-3xl btn-ghost hidden md:flex">Sous-catégories</h4>
          {#each category.category_children as child}
          	<a href={`/store/categories/${child.handle}`} class="btn btn-neutral btn-outline btn-sm md:btn-md rounded-3xl">{child.name}</a>
          {/each}
        </div>
        </div>
      {/if}

    {#if products.count === 0}
    	<div class="alert alert-warning">
        Aucun produit dans cette catégorie
      </div>
    {:else}
  <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4">
    {#each products.products as product}
      <ProductCard {product} />
    {/each}
  </section>
    {/if}
</div>

{/if}
</main>
