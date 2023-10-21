<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<h1>{data.title}</h1>
<form method="POST">
  <input type="text" name="email" />
  <input type="password" name="password" />
  <button type="submit">Login</button>
</form>
