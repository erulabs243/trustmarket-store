<script lang="ts">
  import { IconBrandInstagram, IconBrandWhatsapp, IconBrandYoutube, IconBrandTelegram, IconMail } from "@tabler/icons-svelte";


  export let location: string;
</script>


  <nav class={`${location === "footer" ? "flex flex-row place-self-end  justify-self-end" : "flex flex-row gap-2 md:gap-4 items-center" }`}>
    <a href="/" class="btn btn-circle">
      <IconBrandInstagram />
    </a>
    <a href="/" class="btn btn-circle">
      <IconBrandWhatsapp />
    </a>
    <a href="/" class="btn btn-circle">
      <IconBrandYoutube />
    </a>
    <a href="/" class="btn btn-circle">
      <IconBrandTelegram />
    </a>
    <a href="/" class="btn btn-circle">
      <IconMail />
    </a>
  </nav>
