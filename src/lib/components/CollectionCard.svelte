<script lang="ts">
  import type { CollectionType } from "$lib/types/apiType";
  import { IconArrowRight } from "@tabler/icons-svelte";

  export let collection: CollectionType;
</script>

<div class="card bg-base-200 shadow-sm">
  <div class="card-body">
    <h4 class="card-title">{collection.title}</h4>
    {#if collection.metadata?.description}
      <p>{collection.metadata?.description}</p>
    {/if}
    <div class="card-actions">
      <a
        href={`/store/collections/${collection.handle}`}
        class="btn btn-primary rounded-3xl"
      >
        Voir la collection
        <IconArrowRight />
      </a>
    </div>
  </div>
</div>
