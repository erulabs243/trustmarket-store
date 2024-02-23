<script lang="ts">
  import type { PageData } from "./$types";
  import userStore from "$lib/stores/user";
    import { goto } from "$app/navigation";

  export let data: PageData;
  $userStore = null;

  goto("/");  
</script>
<h1>Logout</h1>
