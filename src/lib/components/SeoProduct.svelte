<script lang="ts">
  import { APPNAME, DESCRIPTION, URL } from "$lib/constants";
  import logo from "$lib/assets/logo.png";
    import { displayCurrency, setCurrency } from "$lib/utils/lang";
  
  export let title = APPNAME;
  export let description = DESCRIPTION;
  export let keywords = `${APPNAME}, E-commerce, RDC, Congo, Vente en ligne`;
  export let metaType = "Page";
  export let image = logo;
  export let url = URL;
  export let price = 0;
  export let variant = "";

</script>

<svelte:head>
  <title>{`${description} | ${title}`}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />

  <!-- SOCIAL MEDIA : OPENGRAPH -->
  <meta property="og:title" content={`${APPNAME} | ${title}`} />
  <meta property="og:type" content={metaType} />
  <meta property="og:image" content={image} />
  <meta property="og:url" content={url} />
  <meta property="og:description" content={description} />
  <meta property="og:site_name" content={APPNAME} />
  <meta property="og:price:amount" content={String(setCurrency(price))} />
  <meta property="og:price:currency" content="USD" />

  <!-- SOCIAL MEDIA : TWITTER -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content={url} />
  <meta name="twitter:title" content={`${APPNAME} | ${title}`} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
  <meta name="twitter:data1" content={displayCurrency(price)} />
  <meta name="twitter:label1" content="Prix" />
  <meta name="twitter:data2" content={variant} />
  <meta name="twitter:label2" content="Modèle" />

  <!-- AUTHORING -->
  <meta name="author" content="TrustMarket" />
  <meta name="copyright" content={`TrustMarket, ${new Date().getFullYear()}`} />
  
</svelte:head>
