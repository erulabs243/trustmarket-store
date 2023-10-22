<script lang="ts">
  import { IconSearch, IconShoppingBag } from "@tabler/icons-svelte";
</script>

<div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl" href="/">TrustMarket</a>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <li><a href="/">Accueil</a></li>
      <li><a href="/categories">Nos catégories</a></li>
      <li><a href="/collections">Nos collections</a></li>
    </ul>
  </div>
  <div class="navbar-end justify-end gap-4">
    <div class="form-control w-full flex flex-row items-center gap-2">
      <IconSearch size={24} stroke={1} />
      <input
        type="search"
        placeholder="Rechercher un produit..."
        class="input w-full rounded-lg"
      />
      <button type="submit" class="btn btn-secondary rounded-lg">
        Rechercher
      </button>
    </div>
    <a href="/cart" class="btn btn-ghost btn-circle">
      <IconShoppingBag />
    </a>
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="https://i.pravatar.cc/300" />
        </div>
      </label>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a class="justify-between">
            Profile
            <span class="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
