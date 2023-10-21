<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<h1>{data.title}</h1>
<h3>{data.text}</h3>
