<script lang="ts">
  import type { ProductType } from "$lib/types/apiType";
  import { displayCurrency } from "$lib/utils/lang";

  export let product: ProductType;
</script>

<a href={`/store/${product.handle}`}>
  <div class="card bg-base-200 shadow-xl">
    <figure class="mx-2 lg:mx-4 mt-2 lg:mt-4 h-44 bg-neutral-300 rounded-xl">
      <img src={product.thumbnail} alt={product.title} class="object-cover" />
    </figure>
    <div class="card-body items-center text-center -mt-4 md:mt-0 h-44">
      <h4 class="card-title font-normal text-base lg:text-lg leading-none lg:leading-normal">{product.title}</h4>
      <p class="font-bold">{displayCurrency(product.variants[0].prices[0].amount)}</p>
      <div class="card-actions">
        <a
          href={`/store/${product.handle}`}
          class="btn btn-secondary btn-sm lg:btn-md rounded-3xl">Acheter</a
        >
      </div>
    </div>
  </div>
</a>
