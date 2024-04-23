<script lang="ts">
  import {IconLogout,  IconUser} from "@tabler/icons-svelte";
</script>

<div class="grid grid-cols-4 gap-20 my-20 w-screen lg:w-2/3 mx-auto">
  <aside class="sticky top-0">
    <ul class="menu bg-base-100 rounded-box">
      <li>
        <a href="/user/profile">
          <IconUser class="h-5 w-5 stroke-gray-800" />
          Profil
        </a>
      </li>
      <li>
        <a href="/auth/logout">
          <IconLogout class="h-5 w-5 stroke-gray-800" />
          Déconnexion
        </a>
      </li>
    </ul>
  </aside>
  <div class="col-span-3">
  <slot />
  </div>
</div>
