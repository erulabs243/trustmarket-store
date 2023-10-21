<script lang="ts">
</script>

<main class="w-screen h-screen px-56 py-40">
  <div class="flex flex-row w-full h-full bg-orange-300 rounded-2xl p-4">
    <section class="h-full flex-1">
      <h1>Left side with image</h1>
    </section>
    <section class="h-full flex-1 bg-orange-50 rounded-lg p-12">
      <slot />
    </section>
  </div>
</main>
