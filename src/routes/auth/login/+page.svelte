<script lang="ts">
  import {page} from "$app/stores";
  import {zodClient} from "sveltekit-superforms/adapters";
  import { loginSchema } from "$lib/schemas/authSchema";
  import type { PageData } from "./$types";
  import { IconLock, IconUser, IconX } from "@tabler/icons-svelte";
  import { superForm } from "sveltekit-superforms/client";
  import userStore from "$lib/stores/user";
    import { goto, invalidateAll } from "$app/navigation";

  export let data: PageData;
  export let usernameInput = "";
  export let passwordInput = "";
  export let error = "";

  const from = $page.url.search.substring($page.url.search.indexOf("?") + 1)

  const { form, errors, enhance, delayed } = superForm(data.form, {
    validators: zodClient(loginSchema),
    onResult: ({ result }) => {

      const message = result.data.form.message;
      if (!result.data.logged) {
        error = message.message;
      } else {
        $userStore = result.data.user;
        const url = from.includes("home") ? "/" : `/${from}`;
        goto(url);
      }
    }
  });

  $: error = "";
  $: usernameInput = $errors.username ? "border-red-500" : "border-gray-500";
  $: passwordInput = $errors.password ? "border-red-500" : "border-gray-500";
</script>

<main class="w-screen lg:w-5/6 mx-auto my-12 lg:my-24">

<div class="w-full px-4 mx-auto">
  <header class="w-full">
    <h1 class="text-center text-2xl">Connexion</h1>
    <p class="text-center">Faites vos achats maintenant !</p>
  </header>
  <form
    method="post"
    class="max-w-md mx-auto my-16 flex flex-col gap-4"
    use:enhance
  >
    {#if error}
      <div class="alert alert-error" role="alert">
        <IconX />
        {error}
      </div>
    {/if}
    <div class="form-control">
      <label class="label" for="username">
        <span class="label-text">Utilisateur/email</span>
      </label>
      <div
        class="join items-center gap-2 bg-white px-4 border rounded-3xl {usernameInput}"
      >
        <IconUser />
        <input
          type="email"
          name="username"
          class="input w-full focus:outline-none px-0 bg-white"
          placeholder="xyz@example.cd"
          aria-invalid={$form.username ? "true" : undefined}
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
          aria-invalid={$form.password ? "true" : undefined}
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
      <button class="btn btn-secondary rounded-3xl" type="submit" disabled={$delayed}>
        {#if $delayed}<span class="loading loading-spinner"></span>{/if}
        Connexion
      </button>
      <a href={`/auth/register?${from}`} class="btn btn-outline rounded-3xl">
        Créer un compte
      </a>
    </div>
  </form>
</div>
</main>
