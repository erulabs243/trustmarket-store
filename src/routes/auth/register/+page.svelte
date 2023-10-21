<script lang="ts">
  import { IconAt, IconLock } from "@tabler/icons-svelte";
</script>

<div>
  <header class="max-w-sm mx-auto">
    <h1 class="text-center text-2xl">Inscription</h1>
    <p class="text-center">Créez un compte et faites vos achats maintenant !</p>
  </header>
  <form method="post" class="max-w-sm mx-auto my-16 flex flex-col gap-4">
    <div class="form-control">
      <label class="label" for="username">
        <span class="label-text">Adresse e-mail</span>i
      </label>
      <div
        class="join items-center gap-2 bg-white px-4 border rounded-3xl border-gray-500"
      >
        <IconAt />
        <input
          type="email"
          name="email"
          class="input w-full focus:outline-none px-0"
          placeholder="xyz@example.cd"
        />
      </div>
    </div>
    <div class="form-control">
      <label class="label" for="password">
        <span class="label-text">Mot de passe</span>
      </label>
      <div
        class="join items-center gap-2 bg-white px-4 border rounded-3xl border-gray-500"
      >
        <IconLock />
        <input
          type="password"
          name="password"
          class="input w-full focus:outline-none px-0"
        />
      </div>
    </div>
    <div class="flex items-center justify-between">
      <button class="btn btn-primary rounded-3xl" type="submit">
        Créer un compte
      </button>
      <a href="/auth/login" class="btn btn-outline rounded-3xl">
        Se connecter
      </a>
    </div>
  </form>
</div>
