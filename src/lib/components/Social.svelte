<script lang="ts">
    import { FACEBOOK_URL, INFO_EMAIL, INSTAGRAM_URL, WHATSAPP_URL, YOUTUBE_URL } from "$lib/constants";
  import { IconBrandInstagram, IconBrandWhatsapp, IconBrandYoutube, IconMail, IconBrandFacebook } from "@tabler/icons-svelte";


  export let location: string;
</script>


  <nav class={`${location === "footer" ? "flex flex-row place-self-end  justify-self-end" : "flex flex-row gap-2 md:gap-4 items-center" }`}>
    <a href={INSTAGRAM_URL} class="btn btn-circle bg-violet-700">
      <IconBrandInstagram color="white" />
    </a>
    <a href={WHATSAPP_URL} class="btn btn-circle bg-green-700">
      <IconBrandWhatsapp color="white" />
    </a>
    <a href={YOUTUBE_URL} class="btn btn-circle bg-red-700">
      <IconBrandYoutube color="white" />
    </a>
    <a href={FACEBOOK_URL} class="btn btn-circle bg-blue-600">
      <IconBrandFacebook color="white" />
    </a>
    <a href={`mailto:${INFO_EMAIL}`} class="btn btn-circle bg-gray-700">
      <IconMail color="white" />
    </a>
  </nav>
