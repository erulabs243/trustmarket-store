
<script lang="ts">
  import { IconFileSad, IconSearch } from "@tabler/icons-svelte";
  import { enhance } from "$app/forms";
    import type { SearchType } from "$lib/types/apiType";
    import { displayCurrency } from "$lib/utils/lang";
    import Seo from "$lib/components/Seo.svelte";
    import { APPNAME } from "$lib/constants";

  export let results: Array<SearchType>;
  export let query: string;
  export let count: number;

  $: query = "";
  $: count = 0;
  $: results = [];
  $: loading = false;
</script>
<Seo 
  title="Recherche"
  description={`Recherchez vos produits sur ${APPNAME}`}
  keywords={`${APPNAME}, Collections, RDC, Congo, Vente en ligne`}
  url={`${URL}/search`}
/>

<main class="w-screen lg:w-5/6 mx-auto">
  <header class="my-8 lg:my-12 w-full lg:w-1/2 mx-auto">
    <form method="post" action="/search" use:enhance={() => {
            loading = true;
      
            return async ({ result }) => {

              console.info(result);
            
              results = result?.data?.data?.hits;
              query = result?.data?.data?.query;
              count = result?.data?.data?.estimatedTotalHits;
              loading = false;
            }
          }}
        class="w-full"
        >
      <div class="form-control w-5/6 lg:w-full flex flex-row items-center gap-2 lg:flex rounded-3xl bg-white pl-4 mx-auto">
          <IconSearch size={24} stroke={1} />
          <input
            type="search"
            name="query"
            placeholder="Rechercher un produit..."
            class="input w-full bg-white rounded-3xl"
          />
          <button type="submit" class="hidden lg:btn btn-secondary rounded-3xl">
            Rechercher
          </button>
          <button type="submit" class="btn btn-secondary rounded-3xl lg:hidden">
            <IconSearch />
          </button>
      </div>
    </form>
  </header>

  <section class="my-8 lg:my-12 px-4">
    {#if loading}
      <div class="w-sm mx-auto p-8 rounded-xl flex items-center justify-center">
        Recherche en cours...
      </div>
    {:else}
      {#if query === ""}
        <div class="flex flex-col items-center justify-center px-8 py-12 lg:py-24 ">
          <IconSearch size={48} stroke={1} />
          <p class="text-center text-2xl">Rechercher un produit</p>
        </div>
      {:else}
        <div class="w-full space-y-4">
          <h1 class="text-2xl text-gray-700 px-4">Résultats trouvés pour <span class="italic font-bold">{query}</span></h1>
          {#if results.length === 0}
            <div class="flex flex-col items-center justify-center p-8 w-full">
              <IconFileSad size={48} stroke={1} />
              <p class="text-center text-2xl">Aucun produit disponible pour cette recherche</p>
            </div>
          {:else}
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4">
            {#each results as product}
              <div class="card bg-base-200 shadow-xl relative text-base">
                <a href={`/store/${product.handle}`} class="absolute top-0 bottom-0 left-0 right-0"></a>
                  <img src={product.thumbnail} alt={product.title} class="object-cover rounded-xl mx-2 lg:mx-4 mt-2 lg:mt-4 h-44" />
                <div class="card-body items-center text-center -mt-4 md:mt-0 max-h-44">
                  <h4 class="card-title font-normal text-xs lg:text-md uppercase leading-snug lg:leading-relaxed link link-hover line-clamp-2">{product.title}</h4>
                  {#if product.variants}
                    <p class="font-bold">{displayCurrency(product.variants[0].prices[0].amount)}</p>
                    <div class="card-actions">
                      <a
                        href={`/store/${product.handle}`}
                        class="btn btn-secondary btn-sm lg:btn-md rounded-3xl">Acheter</a
                      >
                    </div>
                  {/if}
                </div>
              </div>
            {/each}          
          </div>
          {/if}
        </div>
      {/if}
    {/if}
  </section>
</main>

  
