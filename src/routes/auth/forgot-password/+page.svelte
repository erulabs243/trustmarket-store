<script lang="ts">
  import { IconLock, IconUser } from "@tabler/icons-svelte";
</script>

<div>
  <header class="w-full">
    <h1 class="text-center text-2xl">Connextion</h1>
    <p class="text-center">Faites vos achats maintenant !</p>
  </header>
  <form method="post" class="max-w-sm mx-auto my-16 flex flex-col gap-4">
    <div class="form-control">
      <label class="label" for="username">
        <span class="label-text">Utilisateur/email</span>
      </label>
      <div
        class="join items-center gap-2 bg-white px-4 border rounded-3xl border-gray-500"
      >
        <IconUser />
        <input
          type="text"
          name="username"
          class="input w-full focus:outline-none px-0"
          placeholder="utilisateur"
        />
      </div>
    </div>
    <div class="form-control">
      <label class="label" for="password">
        <span class="label-text">Mot de passe</span>
        <span class="label-text-alt">
          <a href="/auth/forgot-password" class="link link-secondary"
            >Mot de passe oublié</a
          >
        </span>
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
        Connexion
      </button>
      <a href="/auth/register" class="btn btn-outline rounded-3xl">
        Créer un compte
      </a>
    </div>
  </form>
</div>
