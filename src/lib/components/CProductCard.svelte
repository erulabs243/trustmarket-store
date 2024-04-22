<script lang="ts">
  import type { CustomProduct } from "$lib/types/apiType";
  import { displayCurrency } from "$lib/utils/lang";

  export let product: CustomProduct;

</script>

  <div class="card bg-gray-50 shadow-xl relative text-base">
    <a href={`/store/${product.handle}`} class="absolute top-0 bottom-0 left-0 right-0"></a>
      <img src={product.thumbnail} alt={product.product} class="object-cover bg-gray-50 rounded-xl mx-2 lg:mx-4 mt-2 lg:mt-4 h-44" />
    <div class="card-body items-center text-center -mt-4 md:mt-0 max-h-44">
      <h4 class="card-title font-normal text-xs lg:text-md uppercase leading-snug lg:leading-relaxed link link-hover line-clamp-2">{product.product}</h4>
        <p class="font-bold">{displayCurrency(product.price)}</p>
        <div class="card-actions">
          <a
            href={`/store/${product.handle}`}
            class="btn btn-secondary btn-sm lg:btn-md rounded-3xl">Acheter</a
          >
        </div>
    </div>
  </div>
