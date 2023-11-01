<script lang="ts">
  import CollectionCard from "$lib/components/CollectionCard.svelte";
  import ProductCard from "$lib/components/ProductCard.svelte";
  import { IconArrowRight } from "@tabler/icons-svelte";
  import type { PageData } from "./$types";
  import { navigating } from "$app/stores";

  export let data: PageData;
  export let products = data.products;
  export let collections = data.collections;
  export let latest = data.collections.collections[0];
</script>

{#if $navigating}
  <div class="alert alert-success">
    Chargement...
  </div>
{:else}

<!-- LATEST COLLECTION -->
<div class="flex flex-col gap-4 my-4 lg:my-24 mx-4 lg:mx-0 bg-orange-300 rounded-3xl p-8 lg:p-24 shadow-lg">
  <h2 class="text-2xl lg:text-4xl font-bold text-gray-700">{latest.title}</h2>
  {#if latest.metadata?.description}
    <p class="text-gray-700">{latest.metadata.description}</p>
  {/if}
  <a
    href={`/store/collections/${latest.handle}`}
    class="btn btn-neutral rounded-3xl self-start my-4 lg:my-8"
  >
    Voir la collection
    <IconArrowRight />
  </a>
</div>
<!-- END LATEST COLLECTION -->

<!-- RECENT PRODUCTS -->
<div class="flex flex-col gap-20 my-20">
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
<div class="flex flex-col gap-20 my-20">
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
  <section class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
    {#each collections.collections as collection}
      <CollectionCard {collection} />
    {/each}
  </section>
</div>
<!-- END LATEST COLLECTIONS -->

<!-- BEST SOLD PRODUCTS -->
<div class="flex flex-col gap-20 my-20">
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
