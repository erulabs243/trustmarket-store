<script lang="ts">
    import { APPNAME, DESCRIPTION, INFO_EMAIL, PHONE_NUM_AFRICELL, PHONE_NUM_AIRTEL, URL } from "$lib/constants";
    import { IconBrandInstagram, IconBrandTelegram, IconBrandWhatsapp, IconBrandYoutube, IconMail, IconPhone } from "@tabler/icons-svelte";
    import Social from "./Social.svelte";
    import Seo from "./Seo.svelte";

  const year = new Date().getFullYear();
</script>

<div class="w-screen bg-base-200 mt-12 pt-12 shadow-[0_-8px_36px_0_rgba(30,30,30,0.3)]">
<footer class="footer p-10 w-screen lg:w-5/6 mx-auto bg-base-200 text-base-content">
  <aside class="items-start grid-flow-col hidden md:flex">
      <img src="$lib/assets/logo-icon.png" class="w-12" />
    <div>
        <p>
          <span class="text-lg text-secondary">TrustMarket</span> <br/>{DESCRIPTION}
        </p>
      <div class="my-2">
          <ul>
            <li>{PHONE_NUM_AIRTEL}</li>
            <li>{PHONE_NUM_AFRICELL}</li>
            <li class="mt-2"><a href={`mailto:${INFO_EMAIL}`}>{INFO_EMAIL}</a></li>
          </ul>
      </div>
    </div>
  </aside> 
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full">
  <nav>
    <header class="footer-title">Liens utiles</header>
    <div class="flex flex-col">
      <a class="link link-hover" href="/">Accueil</a>
      <a class="link link-hover" href="/store/categories">Catégories</a>
      <a class="link link-hover" href="/store/collections">Collections</a>
    </div>
  </nav>
  <nav>
    <header class="footer-title">TrustMarket</header> 
    <div class="flex flex-col">
      <a class="link link-hover" href="/about">A propos de nous</a> 
      <a class="link link-hover" href="/contact">Contactez-nous</a> 
      <a class="link link-hover" href="/">Travailler avec nous</a>
      <a href="/legals/privacy" class="link link-hover">Politique de confidentialité</a>
    </div>
  </nav> 
  </div>
  <aside class="items-start grid-flow-col md:hidden">
      <img src="$lib/assets/logo-icon.png" class="w-12" />
    <div>
        <p>
          <span class="text-lg text-secondary">TrustMarket</span> <br/>{DESCRIPTION}
        </p>
      <div class="my-2">
          <ul>
            <li>{PHONE_NUM_AIRTEL}</li>
            <li>{PHONE_NUM_AFRICELL}</li>
            <li class="mt-2"><a href={`mailto:${INFO_EMAIL}`}>{INFO_EMAIL}</a></li>
          </ul>
      </div>
    </div>
  </aside> 
</footer> 
<footer class="footer px-10 py-4 border-t bg-base-200 justify-center lg:justify-between items-center text-base-content border-base-300 w-screen lg:w-5/6 mx-auto">
  <a class="link link-hover" href="/">Copyright &copy; {year} - Tous droits réservés</a>
  
    <Social location="footer" />
  <footer>
</div>
