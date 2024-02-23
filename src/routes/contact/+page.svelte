<script lang="ts">
    import CartItem from "$lib/components/CartItem.svelte";
import SeoProduct from "$lib/components/SeoProduct.svelte";
    import Social from "$lib/components/Social.svelte";
    import { ADDRESS, APPNAME, INFO_EMAIL, PHONE_NUM_AFRICELL, PHONE_NUM_AIRTEL, URL, WA_NUM } from "$lib/constants";


</script>

<SeoProduct 
  description="Contactez-nous"
  keywords={`${APPNAME}, contacts, vente en ligne, Congo, RDC`}
  metaType="page"
  url={`${URL}/contact`}
/>

<div class="w-screen lg:w-5/6 mx-auto flex flex-col md:flex-row gap-4 md:gap-8 my-8 lg:my-12">
<section class="px-4 md:px-8  w-full">
  <div class="w-full lg:max-w-md mx-auto p-4 md:p-8 bg-gray-200 rounded-xl">
  <h1 class="text-2xl lg:text-3xl font-bold text-center my-4 lg:my-8">Contactez-nous </h1>

  <p class="text-center text-gray-700">
    Que vous ayez une question concernant votre commande, que vous ayez besoin d'aide pour naviguer sur le site ou que vous souhaitiez simplement dire bonjour, notre équipe d'assistance est prête à vous aider. N'hésitez pas à nous contacter
  </p>

  <div class="w-full flex items-center justify-center my-4 lg:my-8">
  <a href={`https://wa.me/${WA_NUM}`} class="btn btn-secondary">Discuter maintenant</a>
  </div>
  </div>
  
</section>

<!-- Contact form -->
<aside class="w-full p-4 md:p-8">
  <h2 class="text-xl md:text-2xl text-gray-700 my-4 lg:my-8">
    Retrouvez-nous plus facilement 
  </h2>

  <section class="flex flex-col gap-4">
  <!-- Phone number -->
  <div>
    <h4 class="text-gray-700 font-bold text-sm">Numéro de téléphone</h4>
    <div class="mx-4">
      <p>{PHONE_NUM_AIRTEL}</p>
      <p>{PHONE_NUM_AFRICELL}</p>
    </div>
  </div>

  <!-- Location -->
  <div>
    <h4 class="text-gray-700 font-bold text-sm">Adresse de localisation</h4>
    <div class="mx-4">
      <p>{ADDRESS}</p>
    </div>
  </div>

  <!-- Email Address -->
  <div>
    <h4 class="text-gray-700 font-bold text-sm">Adresse e-mail</h4>
    <div class="mx-4">
      <p><a href={`mailto:${INFO_EMAIL}`} class="link link-hover">{INFO_EMAIL}</a></p>
    </div>
  </div>

  <!-- Social links -->
  <div>
    <h4 class="text-gray-700 font-bold text-sm">Réseaux sociaux</h4>
    <div class="mx-4 mt-2">
      <Social location="contact" />
    </div>
  </div>
  </section>
</aside>
</div>
