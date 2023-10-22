<script lang="ts">
  import CollectionCard from "$lib/components/CollectionCard.svelte";
  import ProductCard from "$lib/components/ProductCard.svelte";
  import { IconArrowRight } from "@tabler/icons-svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  export let products = data.products;
  export let collections = data.collections;
  export let latest = data.collections.collections[0];
</script>

<!-- LATEST COLLECTION -->
<div class="flex flex-col gap-4 my-24 bg-orange-300 rounded-3xl p-24">
  <h2>{latest.title}</h2>
  {#if latest.metadata?.description}
    <p>{latest.metadata.description}</p>
  {/if}
  <a
    href={`/store/collections/${latest.handle}`}
    class="btn btn-secondary rounded-3xl self-start my-8"
  >
    Voir la collection
    <IconArrowRight />
  </a>
</div>
<!-- END LATEST COLLECTION -->

<!-- RECENT PRODUCTS -->
<div class="flex flex-col gap-20 my-20">
  <header>
    <h2 class="text-center">Produits récents</h2>
    <p class="text-center">
      Retrouvez chaque jour de nouveaux produits sur notre boutique
    </p>
  </header>
  <section class="grid grid-cols-6 gap-4">
    {#each products.products as product}
      <ProductCard {product} />
    {/each}
  </section>
</div>
<!-- END RECENT PRODUCTS -->

<!-- LATEST COLLECTIONS -->
<div class="flex flex-col gap-20 my-20">
  <header class="flex flex-col items-center">
    <h2 class="text-center">Nos collections</h2>
    <p class="text-center">Toujours quelque chose de spécial pour vous</p>
    <a
      href="/store/collections"
      class="btn btn-outline btn-secondary rounded-3xl mt-12"
    >
      Explorer nos collections
      <IconArrowRight />
    </a>
  </header>
  <section class="grid grid-cols-3 gap-12">
    {#each collections.collections as collection}
      <CollectionCard {collection} />
    {/each}
  </section>
</div>
<!-- END LATEST COLLECTIONS -->

<!-- BEST SOLD PRODUCTS -->
<div class="flex flex-col gap-20 my-20">
  <header>
    <h2 class="text-center">Les plus vendus</h2>
    <p class="text-center">Ils ont aimé ! Vous aimerez certainement aussi...</p>
  </header>
  <section class="grid grid-cols-6 gap-4">
    {#each products.products as product}
      <ProductCard {product} />
    {/each}
  </section>
</div>
<!-- END BEST SOLD PRODUCTS -->
