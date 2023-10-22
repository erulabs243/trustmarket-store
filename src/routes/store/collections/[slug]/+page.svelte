<script lang="ts">
  import ProductCard from "$lib/components/ProductCard.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  export let { empty, collection, products } = data;
</script>

<div class="flex flex-col gap-24 my-24">
  <h1>{collection.title}</h1>
  <section class="grid grid-cols-6 gap-4">
    {#each products.products as product}
      <ProductCard {product} />
    {/each}
  </section>
</div>
