<script lang="ts">
  import { enhance } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  import type { ActionResult } from "@sveltejs/kit";
  import {
    IconAlertTriangle,
    IconAt,
    IconLock,
    IconPhone,
    IconRadioactive,
    IconUser,
    IconX,
  } from "@tabler/icons-svelte";

  let actionData: undefined | ActionResult;
  let registrationData: undefined | ActionResult;

  export let label: string;
  type FormType = "login" | "registration";
  let form: FormType = "login";

  let username: string = "";
  let password: string = "";
  let firstName: string = "";
  let lastName: string = "";
  let email: string = "";
  let phone: string = "";

  let loading: boolean = false;

  const formError = (field: string, errors: Array<{field: string; message: string}>) => {
    if(errors){
      const error = errors.find(item => 
        item.field === field
      );

      return error;
    }


    return null;
  };
</script>

<button class="btn btn-primary rounded-3xl" onclick="loginForm.showModal()">
  {label}
</button>

<!-- START LOGIN MODAL-->
<dialog id="loginForm" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <div class="tabs tabs-boxed mb-8">
      <button
        class={`tab tab-lg w-1/2 ${form === "login" ? "tab-active" : ""}`}
        on:click={() => (form = "login")}>Connexion</button
      >
      <button
        class={`tab tab-lg w-1/2 ${
          form === "registration" ? "tab-active" : ""
        }`}
        on:click={() => (form = "registration")}>Inscription</button
      >
    </div>
    {#if form === "login"}
      <div>
        <h3 class="font-bold text-xl">Connexion</h3>
        <p class="mb-4">Connectez-vous pour finaliser votre commande</p>
        <form
          method="post"
          action="/auth?/login"
          use:enhance={({ action }) => {
            loading = true;

            return async ({ result, update }) => {
              if (result.status === 200) {
                invalidateAll();
                //const d = document.querySelector("#loginForm");
                //d.close();
              } else {
                actionData = result;
              }

              loading = false;
              await update();
            };
          }}
        >
          {#if actionData}
            {#if actionData.status === 400}
              <div class="alert alert-error my-4">
                <IconAlertTriangle />
                <span>Identifiants incorrectes</span>
              </div>
            {/if}
          {/if}
          <div class="flex flex-col gap-4">
            <div class="form-control">
              <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconUser />
                <input
                  type="text"
                  name="username"
                  class="input w-full focus:outline-none px-0"
                  placeholder="utilisateur"
                  bind:value={username}
                />
              </div>
            </div>
            <div class="form-control">
              <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconLock />
                <input
                  type="password"
                  name="password"
                  class="input w-full focus:outline-none px-0"
                  placeholder="********"
                  bind:value={password}
                />
              </div>
            </div>
            <button
              type="submit"
              class={`btn btn-primary rounded-3xl ${
                loading ? "btn-disabled" : ""
              }`}
            >
              Se connecter
              {#if loading}
                <span class="loading loading-spinner" />
              {/if}
            </button>
          </div>
        </form>
      </div>
    {:else}
      <div>
        <h3 class="font-bold text-xl">Inscription</h3>
        <p class="mb-4">Créez un compte et faites vos achats...</p>
        <form
          method="post"
          action="/auth?/register"
          use:enhance={({ action }) => {
            loading = true;

            return async ({ result, update }) => {

              console.log(result);

              if (result.status === 200) {
                invalidateAll();
                document.querySelector("#loginForm").close();
                loading = false;
                await update();
                //const d = document.querySelector("#loginForm");
                //d.close();
              } else {
                registrationData = result;
                loading = false;
                await update();
              }
            };
          }}
        >
          {#if registrationData}
            {#if registrationData.status === 400}
              <div class="alert alert-error my-4">
                <IconAlertTriangle />
                <span>Une erreur lors de la création de votre compte. Veuillez réessayer...</span>
              </div>
            {:else if registrationData.status === 422}
              <div class="alert alert-error my-4">
                <IconAlertTriangle />
                <span>Adresse e-mail déjà utilisée</span>
              </div>
            {/if}
          {/if}
          <div class="flex flex-col gap-4">
      
            <div class="form-control">
              <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconAt />
                <input
                  type="email"
                  name="email"
                  class="input w-full focus:outline-none px-0"
                  placeholder="xyz@example.cd"
                  bind:value={email}
                />
              </div>
            {#if registrationData && formError("email", registrationData.data.errors)}
            <div class="label">
              <span class="label-text-alt text-red-500">{formError("email", registrationData?.data.errors)?.message}</span>
            </div>
            {/if}
            </div>
            <div class="form-control">
      
              <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconUser />
                <input
                  type="text"
                  name="firstName"
                  class="input w-full focus:outline-none px-0"
                  placeholder="Nom"
                  bind:value={firstName}
                />
              </div>
              {#if registrationData && formError("firstName", registrationData.data.errors)}
              <div class="label">
              	<span class="label-text-alt text-red-500">
                  {formError("firstName", registrationData.data.errors)?.message}
                </span>
              </div>
              {/if}
            </div>
            <div class="form-control">
        <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconUser />
                <input
                  type="text"
                  name="lastName"
                  class="input w-full focus:outline-none px-0"
                  placeholder="Prénom"
                  bind:value={lastName}
                />
              </div>
              {#if registrationData && formError("lastName", registrationData.data.errors)}
              <div class="label">
              	<span class="label-text-alt text-red-500">{formError("lastName", registrationData.data.errors)?.message}</span>
              </div>
              {/if}
            </div>
            <div class="form-control">
              <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconPhone />
                <input
                  type="tel"
                  name="phone"
                  class="input w-full focus:outline-none px-0"
                  placeholder="+243000000000"
                  bind:value={phone}
                />
              </div>
              {#if registrationData && formError("phone", registrationData.data.errors)}
                <div class="label">
                  <span class="label-text-alt text-red-500">      	
                    Numéro de téléphone est invalide
                  </span>
                </div>
              {/if}
            </div>
            <div class="form-control">
              <div
                class="join items-center gap-2 bg-white px-4 border rounded-3xl"
              >
                <IconLock />
                <input
                  type="password"
                  name="password"
                  class="input w-full focus:outline-none px-0"
                  placeholder="********"
                  bind:value={password}
                />
              </div>
              {#if registrationData && formError("password", registrationData.data.errors)}
                <div class="label">
                  <span class="label-text-alt text-red-500">
                    Choisissez un mot de passe avec au moins 8 caractères, 1 lettre majuscule, 1 lettre miniscule, 1 caractère spécial et 1 chiffre.
                  </span>
                </div>
              {/if}
            </div>
            <button
              type="submit"
              class={`btn btn-primary rounded-3xl ${
                loading ? "btn-disabled" : ""
              }`}
            >
              Créer un compte
              {#if loading}
                <span class="loading loading-spinner" />
              {/if}
            </button>
          </div>
        </form>
      </div>
    {/if}
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
<!-- END LOGIN MODAL -->
