<script lang="ts">
    import { IconAlertTriangleFilled, IconX } from "@tabler/icons-svelte";
import type { PageData } from "./$types";

    export let data: PageData;
    export let me = data.me;

    // Customer values
    let first_name = me?.customer.first_name;
    let last_name = me?.customer.last_name;
    let email = me?.customer.email;    
    let phone = me?.customer.phone;

    let password: string = "";
    let confirmPassword: string = "";

    let updatingPassword: boolean = false;
    let errorPassword: string | null;

    const updatePassword = async () => {
      updatingPassword = true;

      if (password.length === 0) {
        errorPassword = "Veuillez entrer un mot de passe";
        updatingPassword = false;
      } else if (password.length < 8 ){
        errorPassword = "Votre mot de pass est trop court";
        updatingPassword = false;
      } else if (password !== confirmPassword) {
        errorPassword = "Les mots de passe ne correspondent pas"
        updatingPassword = false;
      } else {
        // TODO update password in database
      }
    }
  
</script>

<main class="p-4 space-y-4">
  <header>
    <h1 class="text-2xl font-bold">Mon profil</h1>
    <p class="text-xl text-gray-700">{`${me?.customer.first_name} ${me?.customer.last_name}`}</p>
  </header>

  <div class="space-y-2">
      <div class="form-control w-full flex flex-col md:flex-row items-center">
        <label class="label w-full md:w-1/3" for="first_name">Prénom</label>
        <input type="text" name="first_name" class="input w-full md:w-2/3 focus:outline-none bg-white" bind:value={first_name} disabled />
      </div>

      <div class="form-control w-full flex flex-col md:flex-row items-center">
        <label for="last_name" class="label w-full md:w-1/3">Nom</label>
        <input type="text" name="last_name" class="input w-full md:w-2/3 focus:outline-none bg-white" bind:value={last_name} disabled />
      </div>

      <div class="form control w-full flex flex-col md:flex-row items-center">
        <label for="email" class="label w-full md:w-1/3">E-mail</label>
        <input type="email" name="email" class="input w-full md:w-2/3 focus:outline-none bg-white" bind:value={email} disabled />
      </div>

      <div class="form-control w-full flex flex-col md:flex-row items-center">
        <label for="phone" class="label w-full md:w-1/3">Téléphone</label>
        <input type="tel" name="phone" class="input w-full md:w-2/3 focus:outline-none bg-white" bind:value={phone} disabled />
      </div>

      <!-- Reset password using a token -->
      <!--
      <div class="py-4">
        <div class="px-4 py-2 lg:pl-8 border-l-4 border-primary bg-base-200 rounded-xl">
          <h3 class="text-lg font-semibold">Changer de mot de passe</h3>

          {#if errorPassword}
          	<div role="alert" class="alert alert-warning shadow-lg my-2">
          	  <IconX />
          	  <p class="text-sm">{errorPassword}</p>
          	</div>
          {/if}

          <div class="flex flex-col md:flex-row gap-4">
            <div class="form-control grow flex flex-col">
              <label for="password" class="label text-sm text-gray-700">Nouveau mot de passe</label>
              <input type="password" name="password" class="input focus:outline-none bg-white" bind:value={password} />
            </div>

            <div class="form-control grow flex flex-col">
              <label for="confirmPassword" class="label text-sm text-gray-700">Confirmation du mot de passe</label>
              <input type="password" name="confirmPassword"  class="input focus:outline-none bg-white" bind:value={confirmPassword} />
            </div>
          </div>

          <button class="btn btn-outline btn-secondary mt-4 btn-sm" disabled={updatingPassword} on:click={updatePassword}>
            {#if updatingPassword}
            	<span class="loading loading-spinner"></span>
            {/if}
            Changer de mot de passe
          </button>

        </div>
      </div>
      -->

      <div class="py-4">
        <div role="alert" class="alert alert-error shadow-lg">
          <IconAlertTriangleFilled />
          <div>
            <h3 class="font-bold">Supprimer mon compte</h3>
            <p>Voulez-vous supprimer votre compte ? Attention ! Cette action est irreversible !</p>
          </div>
          <form method="post" action="/auth/logout?/delete">
            <button class="btn btn-outline btn-sm btn-neutral" type="submit">Supprimer</button>
          </form>
        </div>
      </div>
  </div>

</main>
