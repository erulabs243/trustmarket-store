<script lang="ts">
  import type { CollectionType } from "$lib/types/apiType";
  import { IconArrowRight } from "@tabler/icons-svelte";

  export let collection: CollectionType;
</script>

<div class="card bg-base-200 group hover:bg-secondary shadow-xl mx-4">
  <div class="card-body">
    <h4 class="text-center lg:text-left font-bold text-2xl text-neutral group-hover:text-base-100">{collection.title}</h4>
    {#if collection.metadata?.description}
      <p class="text-gray-700 text-center lg:text-left group-hover:text-base-100">{collection.metadata?.description}</p>
    {/if}
    <div class="card-actions">
      <a
        href={`/store/collections/${collection.handle}`}
        class="btn btn-secondary group-hover:btn-neutral mx-auto lg:mx-0 rounded-3xl my-4"
      >
        Voir la collection
        <IconArrowRight />
      </a>
    </div>
  </div>
</div>
