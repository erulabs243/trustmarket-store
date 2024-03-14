<script lang="ts">
  import CollectionCard from "$lib/components/CollectionCard.svelte";
  import ProductCard from "$lib/components/ProductCard.svelte";
  import { IconArrowRight } from "@tabler/icons-svelte";
  import type { PageData } from "./$types";
  import { navigating } from "$app/stores";
    import Seo from "$lib/components/Seo.svelte";
    import CategoryCard from "$lib/components/CategoryCard.svelte";

  export let data: PageData;
  export let products = data.products;
  export let collections = data.collections;
  export let arrivals = data.arrivals;
  export let arrival = data.arrival;
  export let categories = data.categories;

</script>

<Seo />


{#if $navigating}
  <div class="alert alert-success">
    Chargement...
  </div>
{:else}

<!-- ARRIVALS -->
<div class="flex flex-col gap-20 my-20 w-screen lg:w-5/6 mx-auto">
  <header>
    <h2 class="text-center text-xl lg:text-2xl text-primary font-bold uppercase">{arrival.title}</h2>
    <p class="text-center px-8 text-gray-700">{arrival?.metadata?.description}</p>
  </header>
  <section class="grid grid-cols-2 gap-4 px-4 md:grid-cols-3 lg:grid-cols-6">
    {#each arrivals.products as product}
      <ProductCard {product} />
    {/each}
  </section>
</div>

<!-- /ARRIVALS -->


<!-- CATEGORIES -->
<div class="flex flex-col gap-20 my-20 lg:my-32 bg-orange-200 py-12 lg:py-24 shadow-[0_0_64px_0_rgba(30,30,30,0.2)]">
  <header class="flex flex-col items-center">
    <h2 class="text-center text-xl lg:text-2xl text-primary font-bold uppercase">Nos catégories</h2>
    <p class="text-center px-8 text-gray-700">Explorez tous nos produits par catégorie</p>
  </header>
  <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-screen lg:w-5/6 mx-auto">
    {#each categories as category }
      <CategoryCard {category} />
    {/each}
  </section>
</div>
<!-- END CATEGORIES -->

<!-- RECENT PRODUCTS -->
<div class="flex flex-col gap-20 my-20 w-screen lg:w-5/6 mx-auto">
  <header>
    <h2 class="text-center text-xl lg:text-2xl text-primary font-bold uppercase">Produits récents</h2>
    <p class="text-center px-8 text-gray-700">
      Retrouvez chaque jour de nouveaux produits sur notre boutique
    </p>
  </header>
  <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4">
    {#each products.products as product}
      <ProductCard {product} />
    {/each}
  </section>
</div>
<!-- END RECENT PRODUCTS -->

<!-- LATEST COLLECTIONS -->
<div class="flex flex-col gap-20 my-20 lg:my-32 bg-orange-200 py-12 lg:py-24 shadow-[0_0_64px_0_rgba(30,30,30,0.2)]">
  <header class="flex flex-col items-center">
    <h2 class="text-center text-xl lg:text-2xl text-primary font-bold uppercase">Nos collections</h2>
    <p class="text-center px-8 text-gray-700">Toujours quelque chose de spécial pour vous</p>
    <a
      href="/store/collections"
      class="btn btn-outline btn-secondary rounded-3xl mt-12"
    >
      Explorer nos collections
      <IconArrowRight />
    </a>
  </header>
  <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-screen lg:w-5/6 mx-auto">
    {#each collections as collection}
      <CollectionCard {collection} />
    {/each}
  </section>
</div>
<!-- END LATEST COLLECTIONS -->

<!-- BEST SOLD PRODUCTS -->
<div class="flex flex-col gap-20 my-20 w-screen lg:w-5/6 mx-auto">
  <header>
    <h2 class="text-center text-xl lg:text-2xl text-primary font-bold uppercase">Les plus vendus</h2>
    <p class="text-center px-8 text-gray-700">
      Ils ont aimé ! Vous aimerez certainement aussi...
    </p>
  </header>
  <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4">
    {#each products.products as product}
      <ProductCard {product} />
    {/each}
  </section>
</div>
<!-- END BEST SOLD PRODUCTS -->

{/if}

