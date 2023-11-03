<script>
    import Seo from "$lib/components/Seo.svelte";
    import { URL } from "$lib/constants";

</script>
<Seo description="Commande acceptée" url={`${URL}/cart/success`} />

<main class="w-screen lg:w-5/6 mx-auto">
<div class="alert alert-success w-5/6 lg:w-1/3 mx-auto my-12 lg:my-24">
  <p class="text-xl mt-4">Votre commande a été reçu.</p>
  <a href="/store/collections" class="btn btn-primary rounded-3xl ">Voir nos produits</a>
</div>
</main>
