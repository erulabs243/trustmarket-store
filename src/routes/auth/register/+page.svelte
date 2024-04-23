<script lang="ts">
  import { page } from "$app/stores";
  import { IconAt, IconLock, IconUser, IconX } from "@tabler/icons-svelte";
    import type { PageData } from "./$types";
    import { superForm } from "sveltekit-superforms/client";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { registrationSchema } from "$lib/schemas/authSchema";
    import { goto } from "$app/navigation";
    import userStore from "$lib/stores/user";

  export let data: PageData;
  export let error: string;

  const from = $page.url.search.substring($page.url.search.indexOf("?") + 1)
  const redirectUrl = from.includes("home") ? "/" : from.substring(from.indexOf("=") + 1);

  const {form, enhance, errors, delayed} = superForm(data.form, {
    validators: zodClient(registrationSchema),
    onResult: ({ result }) => {

      console.info(result);

        const message = result.data.form.message;
        if (!result.data.logged) {
          error = message.message;
        } else {
          $userStore = result.data.user;
          goto(redirectUrl);
        }
    }
  })

  
  $: error = "";
</script>

<div class="pt-12">
  <header class="max-w-sm mx-auto">
    <h1 class="text-center text-2xl">Inscription</h1>
    <p class="text-center">Créez un compte et faites vos achats maintenant !</p>
  </header>
  <form method="post" class="max-w-sm mx-auto mb-16 mt-4 flex flex-col gap-4" use:enhance>
    {#if error}
      <div class="alert alert-error" role="alert">
        <IconX />
        {error}
      </div>
    {/if}
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
          class="input w-full focus:outline-none px-0 bg-white"
          placeholder="xyz@example.cd"
          aria-invalid={$form.email ? "true" : undefined}
          bind:value={$form.email}
        />
      </div>
      {#if $errors.email}
        <label class="label">
          <span class="label-text-alt text-red-500">{$errors.email}</span>
        </label>
      {/if}
    </div>
    <div class="form-control">
      <label for="firstName" class="label">
        <span class="label-text">Nom</span>
      </label>
      <div class="join items-center gap-2 bg-white px-4 border rounded-3xl border-gray-500">
        <IconUser />
        <input 
          type="text" 
          name="firstName"
          class="input w-full px-0 bg-white focus:outline-none"
          placeholder="Nom"
          aria-invalid={$errors.firstName ? "true" : undefined}
          bind:value={$form.firstName}  
        />
      </div>
      {#if $errors.firstName}
        <label class="label">
          <span class="label-text-alt text-red-500">{$errors.firstName}</span>
        </label>
      {/if}
    </div>
    <div class="form-control">
      <label for="lastName" class="label">
        <span class="label-text">Post-nom</span>
      </label>
      <div class="join items-center gap-2 bg-white px-4 border rounded-3xl border-gray-500">
        <IconUser />
        <input 
          type="text" 
          name="lastName"
          class="input w-full px-0 bg-white focus:outline-none"
          placeholder="Post-nom" 
          aria-invalid={$errors.lastName ? "true" : undefined}
          bind:value={$form.lastName}
        />
      </div>
      {#if $errors.lastName}
      	<label class="label">
      	  <span class="label-text-alt text-red-500">{$errors.lastName}</span>
      	</label>
      {/if}
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
          class="input w-full focus:outline-none px-0 bg-white"
          placeholder="********"
          aria-invalid={$errors.password ? "true" : undefined}
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
      <button class="btn btn-primary rounded-3xl" type="submit" disabled={$delayed}>
        {#if $delayed}
        	<span class="loading loading-spinner"></span>
        {/if}
        Créer un compte
      </button>
      <a href={`/auth/login?${from}`} class="btn btn-outline rounded-3xl">
        Se connecter
      </a>
    </div>
  </form>
</div>
