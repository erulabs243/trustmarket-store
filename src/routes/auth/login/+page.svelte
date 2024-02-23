<script lang="ts">
  import {page} from "$app/stores";
  import { loginSchema } from "$lib/schemas/authSchema";
  import type { PageData } from "./$types";
  import { IconLock, IconUser } from "@tabler/icons-svelte";
  import { superForm } from "sveltekit-superforms/client";
  import userStore from "$lib/stores/user";
    import { goto, invalidateAll } from "$app/navigation";

  export let data: PageData;
  export let usernameInput = "";
  export let passwordInput = "";

  const from = $page.url.search.substring($page.url.search.indexOf("?") + 1)

  const { form, errors, enhance } = superForm(data.form, {
    validators: loginSchema,
    onResult: ({ result }) => {
      console.info(JSON.stringify(result, null, 2));
      $userStore = result.data.user;
      goto(from);
      invalidateAll();
      
    }
  });
  $: usernameInput = $errors.username ? "border-red-500" : "border-gray-500";
  $: passwordInput = $errors.password ? "border-red-500" : "border-gray-500";
</script>

<SuperDebug data={$form} />

<div>
  <header class="w-full">
    <h1 class="text-center text-2xl">Connextion</h1>
    <p class="text-center">Faites vos achats maintenant !</p>
  </header>
  <form
    method="post"
    class="max-w-sm mx-auto my-16 flex flex-col gap-4"
    use:enhance
  >
    <div class="form-control">
      <label class="label" for="username">
        <span class="label-text">Utilisateur/email</span>
      </label>
      <div
        class="join items-center gap-2 bg-white px-4 border rounded-3xl {usernameInput}"
      >
        <IconUser />
        <input
          type="text"
          name="username"
          class="input w-full focus:outline-none px-0 bg-white"
          placeholder="utilisateur"
          bind:value={$form.username}
        />
      </div>
      {#if $errors.username}
        <label class="label">
          <span class="label-text-alt text-red-500">{$errors.username}</span>
        </label>
      {/if}
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
        class="join items-center gap-2 bg-white px-4 border rounded-3xl {passwordInput}"
      >
        <IconLock />
        <input
          type="password"
          name="password"
          class="input w-full focus:outline-none px-0 bg-white"
          placeholder="********"
          bind:value={$form.password}
        />
      </div>
      {#if $errors.password}
        <label class="label">
          <span class="label-text-alt text-red-500">{$errors.password}</span>
        </label>
      {/if}
    </div>
    <div class="flex items-center justify-between">
      <button class="btn btn-primary rounded-3xl" type="submit">
        Connexion
      </button>
      <a href={`/auth/register?${from}`} class="btn btn-outline rounded-3xl">
        Créer un compte
      </a>
    </div>
  </form>
</div>
