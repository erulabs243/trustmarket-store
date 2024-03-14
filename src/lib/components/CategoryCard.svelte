<script lang="ts">
  import type {CategoryType} from "$lib/types/apiType";
  import { IconArrowRight } from "@tabler/icons-svelte";

  export let category: CategoryType;
</script>

<div class="card bg-base-200 group shadow-xl mx-4 hover:bg-secondary">
  <div class="card-body">
    <h4 class="text-center font-bold text-2xl text-neutral group-hover:text-base-100 lg:text-left">
      {category.name}
    </h4>
    {#if category.description}
      <p class="text-gray-700 text-center lg:text-left group-hover:text-base-100">
        {category.description}
      </p>
    {/if}
    <div class="card-actions">
      <a 
        href={`/store/categories/${category.handle}`}
        class="btn btn-secondary group-hover:btn-neutral mx-auto lg:mx-0 rounded-3xl my-4"
      >
        Voir la catégorie
        <IconArrowRight />
      </a>
    </div>
  </div>
</div>
