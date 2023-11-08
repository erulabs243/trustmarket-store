<script lang="ts">
  import { IconArrowRight } from "@tabler/icons-svelte";
  import type { PageData } from "./$types";
  import ProductCard from "$lib/components/ProductCard.svelte";
  import { navigating } from "$app/stores";
    import Seo from "$lib/components/Seo.svelte";
    import { APPNAME, URL } from "$lib/constants";

  export let data: PageData;
  export let categories = data.categories?.product_categories;

  console.log(categories)
</script>

<Seo 
  title="Catégories"
  description={`Des produits exceptionnels à explorer sur ${APPNAME}`}
  keywords={`${APPNAME}, Catégories, RDC, Congo, Vente en ligne`}
  url={`${URL}/store/categories`}
/>

<main class="w-screen lg:w-5/6 mx-auto">

{#if $navigating}
	<div class="alert alert-success">
    Chargement...
  </div>
{:else}

<div class="flex flex-col gap-24 my-8 lg:my-24">
    <header class="bg-gradient-to-br from-red-300 to-orange-300 mx-4 lg:mx-0 py-12 lg:py-24 rounded-3xl">
      <h1 class="text-center uppercase text-neutral text-xl lg:text-4xl font-bold">
        Nos catégories
      </h1>
    	<p class="text-gray-700 text-center px-8 text-lg lg:text-xl mt-4 w-full lg:w-xs mx-auto">
        Retrouvez des produits neufs et de qualité dans nos catégories  
      </p>
    </header>


  {#each categories as category}
      {#if category.products.length > 0}
    <section class="flex flex-col gap-8 ">
      <header class="flex flex-col lg:flex-row gap-4 items-center justify-between px-0 lg:px-4">
        <div>
          <a href={`/store/categories/${category.handle}`}>
            <h2 class="text-center lg:text-left text-xl lg:text-2xl text-neutral font-bold uppercase">
              {category.name}
            </h2>
          </a>
          	<p class="text-center lg:text-left text-gray-700 text-content-base w-5/6 mx-auto lg:w-96">
              {category.description}
            </p>
        </div>
        <a
          href={`/store/categories/${category.handle}`}
          class="btn btn-secondary rounded-3xl btn-outline"
        >
          Explorer les produits
          <IconArrowRight />
        </a>
      </header>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4">
        {#each category.products as product}
          <ProductCard {product} />
        {/each}
      </div>
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
    </section>
    {/if}
  {/each}
</div>

{/if}

</main>
