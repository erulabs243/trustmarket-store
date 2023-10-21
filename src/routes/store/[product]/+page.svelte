<script lang="ts">
  import ProductCard from "$lib/components/ProductCard.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  export let { product, related } = data;
  export let variant: number = 0;
  export let image: number = 0;
  export let quantity: number = 1;

  const changeVariant = (id: number) => (variant = id);
  const changeImage = (id: number) => (image = id);
</script>

<!-- PRODUCT -->
<section>
  <h1>
    {product.title}
  </h1>
  <div class="flex gap-12">
    <aside class="flex gap-4">
      <div class="flex flex-col gap-2">
        {#each product.images as img, id}
          <button
            on:click={() => changeImage(id)}
            on:keydown={() => changeImage(id)}
          >
            <img
              src={img.url}
              alt={product.title}
              class="rounded-xl h-20 hover:cursor-pointer"
            />
          </button>
        {/each}
      </div>
      <img
        src={product.images[image].url}
        alt={product.title}
        class="rounded-xl h-96 w-96 object-cover"
      />
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
