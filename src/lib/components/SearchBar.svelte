<script lang="ts">
  import { IconSearch } from "@tabler/icons-svelte";
  import { enhance } from "$app/forms";

</script>


  <form method="post" action="/search" use:enhance={() => {
          return async ({ result }) => {
            console.info(result);
          }
        }}
      class="w-full"
      >
    <div class="form-control w-full flex flex-row items-center gap-2 lg:flex rounded-3xl bg-white pl-4">
        <IconSearch size={24} stroke={1} />
        <input
          type="search"
          name="query"
          placeholder="Rechercher un produit..."
          class="input w-full bg-white rounded-3xl"
        />
        <button type="submit" class="btn btn-secondary rounded-3xl">
          Rechercher
        </button>
    </div>
  </form>
