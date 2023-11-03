<script lang="ts">
  import { APPNAME, DESCRIPTION, URL } from "$lib/constants";
  import logo from "$lib/assets/logo.png";
  
  export let title = APPNAME;
  export let description = DESCRIPTION;
  export let keywords = `${APPNAME}, E-commerce, RDC, Congo, Vente en ligne`;
  export let metaType = "Page";
  export let image = logo;
  export let url = URL;

</script>

<svelte:head>
  <title>{`${title} | ${description}`}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />

  <!-- SOCIAL MEDIA : OPENGRAPH -->
  <meta property="og:title" content={`${APPNAME} | ${title}`} />
  <meta property="og:type" content={metaType} />
  <meta property="og:image" content={image} />
  <meta property="og:url" content={url} />
  <meta property="og:description" content={description} />
  <meta property="og:site_name" content={APPNAME} />

  <!-- SOCIAL MEDIA : TWITTER -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content={url} />
  <meta name="twitter:title" content={`${APPNAME} | ${title}`} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />

  <!-- AUTHORING -->
  <meta name="author" content="TrustMarket" />
  <meta name="copyright" content={`TrustMarket, ${new Date().getFullYear()}`} />
  
</svelte:head>
