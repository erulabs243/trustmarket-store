<script lang="ts">
    import { page } from "$app/stores";
  import Navbar from "$lib/components/Navbar.svelte";
  import type {UserSession} from "$lib/types/commons";
  import "../app.css";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  let user: UserSession | null = data.user ? JSON.parse(data.user) : null;

  //TODO load cart data in header
</script>

<Navbar />
<slot />
