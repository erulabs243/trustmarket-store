<script lang="ts">
  import { IconArrowRight } from "@tabler/icons-svelte";
  import type { PageData } from "./$types";
  import ProductCard from "$lib/components/ProductCard.svelte";

  export let data: PageData;
  export let collections = data.collections;
</script>

<div class="flex flex-col gap-24 my-8 lg:my-24">
  {#each collections as collection}
    <section class="flex flex-col gap-8">
      <header class="flex flex-col lg:flex-row gap-4 items-center justify-between">
    <h2 class="text-center text-xl lg:text-2xl text-neutral font-bold uppercase">{collection.collection.title}</h2>
        <a
          href={`/store/collections/${collection.collection.handle}`}
          class="btn btn-secondary rounded-3xl btn-outline"
        >
          Voir la collection
          <IconArrowRight />
        </a>
      </header>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4">
        {#each collection.products as product}
          <ProductCard {product} />
        {/each}
      </div>
    </section>
  {/each}
</div>
