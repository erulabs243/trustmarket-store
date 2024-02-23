<script>
    import Seo from "$lib/components/Seo.svelte";
    import { URL } from "$lib/constants";
    import { IconShoppingBagCheck } from "@tabler/icons-svelte";

</script>
<Seo description="Commande acceptée" url={`${URL}/cart/success`} />

<main class="w-screen lg:w-5/6 mx-auto">
<div class="flex flex-col items-center justify-center gap-4 md:gap-8 border-2 border-primary px-4 py-8 rounded-xl bg-primary/20 w-5/6 lg:w-1/3 mx-auto my-12 lg:my-24">
  <IconShoppingBagCheck size={64} color="#707070" />
  <p class="text-center lg:text-xl mt-4 text-gray-700">Votre commande a été reçu et est en cours de traitement. Nous vous tiendrons au courant de son évolution.</p>
  <a href="/store/collections" class="btn btn-secondary rounded-3xl ">Voir nos produits</a>
</div>
</main>
