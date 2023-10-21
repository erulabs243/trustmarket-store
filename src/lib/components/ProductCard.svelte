<script lang="ts">
  import type { ProductType } from "$lib/types/apiType";
  import { displayCurrency } from "$lib/utils/lang";

  export let product: ProductType;
</script>

<a href={`/store/${product.handle}`}>
  <div class="card bg-base-200 shadow-xl">
    <figure class="mx-4 mt-4 h-44 bg-neutral-300 rounded-xl">
      <img src={product.thumbnail} alt={product.title} class="object-cover" />
    </figure>
    <div class="card-body items-center text-center">
      <h4 class="card-title text-lg">{product.title}</h4>
      <p>{displayCurrency(product.variants[0].prices[0].amount)}</p>
      <div class="card-actions">
        <a
          href={`/store/${product.handle}`}
          class="btn btn-secondary rounded-3xl">Acheter</a
        >
      </div>
    </div>
  </div>
</a>
