<script lang="ts">
    import type { UserSession } from "$lib/types/commons";
    import {page} from "$app/stores";
    import emblaCarouselSvelte from "embla-carousel-svelte";
    import Autoplay from "embla-carousel-autoplay";
  import { IconCategory, IconCategory2, IconHome, IconLogin, IconLogout, IconMail, IconMenu2, IconPhone, IconPhoneCall, IconSearch, IconShoppingBag, IconShoppingBagX,  IconUser } from "@tabler/icons-svelte";
  import userStore from "$lib/stores/user";
    import { cartStore, cartTotalStore } from "$lib/stores/cart";
    import type { Annonce, CategoryType, LineItemType } from "$lib/types/apiType";
    import { displayCurrency } from "$lib/utils/lang";
    import { PHONE_NUM_AIRTEL } from "$lib/constants";

  export let categories: Array<CategoryType> = [];
  export let annonces: Array<Annonce> = [];

  let user: UserSession | null = $userStore;
  let cart: Array<LineItemType>;
  let cartTotal: number;

  cartStore.subscribe((value) => cart = value);
  cartTotalStore.subscribe((value) => cartTotal = value);

  userStore.subscribe(value => user = value);

  let options = { loop: true };
  let plugins = [Autoplay()];
  

  // FIXME close submenus after clicking outside on the document
</script>

<style>
  .embla {
    overflow: hidden;
  }
  .embla__container {
    display: flex;
  }
  .embla__slide {
    flex: 0 0 100%;
    min-width: 0;
  }
</style>

 
<div class="w-full bg-primary py-1">
  <div class="embla" use:emblaCarouselSvelte={{ options, plugins }}>
    <div class="embla__container">
  {#each annonces as annonce}
    <div class="embla__slide w-full">
  	{#if annonce.url}
  	  <p class="text-center text-sm">
    	<a href={annonce.url}>
        {annonce.title}
    	</a>
  	  </p>
    {:else}
      <p class="text-center text-sm">{annonce.title}</p>
    {/if}
    </div>
  {/each}
    </div>
  </div>
</div>
<div class="navbar bg-base-200/50 backdrop-blur-xl w-screen py-4 shadow-lg sticky top-0 z-40">
  <div class="w-full lg:w-5/6 mx-auto flex flex-col gap-2">
    <!-- HEAD NAVBAR -->
    <div class="flex flex-row gap-8 w-screen lg:w-full justify-between">
  <div class="flex lg:w-1/4">
    <div class="dropdown md:hidden">
      <button tabindex="0" class="btn btn-ghost btn-circle btn-neutral">
        <IconMenu2 />
      </button>

        <div class="mt-4 z-[1] dropdown-content menu shadow bg-base-100 rounded-box w-screen" tabindex="0">
          <li>
              <a href="/">
                <IconHome color="#4b5563" />
                Accueil
              </a>
          </li>
        {#if categories.length > 0}
          <li>
            <details>
              <summary class="dropdown">
                <IconCategory color="#4b5563" />
                Catégories
              </summary>

              <ul class="menu" id="categories-menu">
                {#each categories as category}
                  {#if !category.parent_category && category.category_children.length > 0}
                    <li>
                    <details>
                      <summary>{category.name}</summary>
                      <ul class="menu">
                      	{#each category.category_children as child}
                          {#if child.category_children.length > 0}
                          	<li>
                              <details>
                                <summary>{child.name}</summary>
                                <ul class="menu">
                                  {#each child.category_children as subchild}
                                  	<li><a href={`/store/categories/${subchild.handle}`}>{subchild.name}</a></li>
                                  {/each}
                                  <li class="border border-gray-300 rounded-lg bg-base-200"><a href={`/store/categories/${child.handle}`}>{child.name}</a></li>
                                </ul>
                              </details>
                            </li>
                            <li class="border border-gray-300 rounded-lg bg-base-200"><a href={`/store/categories/${category.handle}`}>{category.name}</a></li>
                          {:else}
                            <li><a href={`/store/categories/${child.handle}`}>{child.name}</a></li>
                          {/if}
                        {/each}
                      </ul>
                    </details>
                    </li>
                  {:else if !category.parent_category_id}
                  	<li>
                      <a href={`/store/categories/${category.handle}`}>
                        {category.name}
                      </a>
                    </li>
                  {/if}
                {/each}
              </ul>
            </details>
          </li>
        {/if}
          <li>
            <a href="/store/collections">
              <IconCategory2 color="#4b5563" />
              Collections
            </a>
          </li>
          <li>
            <a href="/contact">
              <IconPhoneCall color="#4b5563" />
              Contactez-nous
            </a>
          </li>
    {#if user}
        <li>
          <a href="/cart">
            <IconShoppingBag color="#3b5563" />
            Mon panier
          </a>
        </li>

          <li>
            <a href="/auth/logout" >
            <IconLogout color="#3b5563" />
            Déconnexion
          </a>
        </li>
    {:else}
      <li>
      <a href={`/auth/login?from=${$page.url.pathname === "/" ? "/home" : $page.url.pathname}`}>
        <IconLogin color="#4b5563" />
        Connexion
      </a>
      </li>
    {/if}
        </div>
    </div>
    <a class="btn btn-ghost normal-case text-xl" href="/">
      <img src="$lib/assets/logo.png" alt="TrustMarket" class="h-6 md:h-8" />    
    </a>
  </div>
  <div class="hidden lg:flex flex-1 lg:w-2/4">

      <!-- MENU -->
      <ul class="menu menu-horizontal rounded-box">
        <li>
          <a href="/">
            <IconHome color="#4b5563" />
            Accueil
          </a>
        </li>
        {#if categories.length > 0}
          <li>
            <details>
              <summary class="dropdown">
                <IconCategory color="#4b5563" />
                Catégories
              </summary>

              <ul class="menu w-64" id="categories-menu">
                {#each categories as category}
                  {#if !category.parent_category && category.category_children.length > 0}
                    <li>
                    <details>
                      <summary>{category.name}</summary>
                      <ul class="menu">
                      	{#each category.category_children as child}
                          {#if child.category_children.length > 0}
                          	<li>
                              <details>
                                <summary>{child.name}</summary>
                                <ul class="menu">
                                  {#each child.category_children as subchild}
                                  	<li><a href={`/store/categories/${subchild.handle}`}>{subchild.name}</a></li>
                                  {/each}
                                  <li class="border border-gray-300 rounded-lg bg-base-200"><a href={`/store/categories/${child.handle}`}>{child.name}</a></li>
                                </ul>
                              </details>
                            </li>
                            <li class="border border-gray-300 rounded-lg bg-base-200 mb-1"><a href={`/store/categories/${category.handle}`}>{category.name}</a></li>
                          {:else}
                            <li><a href={`/store/categories/${child.handle}`}>{child.name}</a></li>
                          {/if}
                        {/each}
                      </ul>
                    </details>
                    </li>
                  {:else if !category.parent_category_id}
                  	<li>
                      <a href={`/store/categories/${category.handle}`}>
                        {category.name}
                      </a>
                    </li>
                  {/if}
                {/each}
              </ul>
            </details>
          </li>
        {/if}
        <li>
          <a href="/store/collections">
            <IconCategory2 color="#4b5563" />
            Collections
          </a>
        </li>
        <li>
          <a href="/contact">
            <IconPhoneCall color="#4b5563" />
            Contactez-nous
          </a>
        </li>
      </ul>
      <!-- END MENU -->
  </div>
  <div class="flex justify-end gap-4 lg:w-1/4">
      
    <a href="/search" class="btn btn-circle btn-secondary">
      <IconSearch />
    </a>
    <div class="dropdown dropdown-end">
      <button tabindex="0" class="btn btn-outline btn-neutral rounded-3xl w-24 lg:w-32">
        <IconShoppingBag />
        <div class="badge badge-secondary">{cart.length}</div>
      </button>
      <div tabindex="0" class="mt-4 z-[1] card card-compact dropdown-content px-2 w-72 bg-base-100 shadow">
        <div class="card-body">
          {#if cart.length === 0}
            <div class="alert alert-warning flex flex-col justify-center gap-1">
              <IconShoppingBagX />
              <span class="text-lg">Panier vide</span>
            </div>
          {:else}
            {@const items = cart.slice(0, 3)}
            {#each items as item}
            	<article class="flex gap-2 items-center">
                <figure class="w-12 h-12">
                  <img src={item.thumbnail} alt={item.title} class="object-cover rounded-xl" />
                </figure>
                <div>
                    <p class="w-full">{item.title}<span class="badge ml-2 badge-secondary badge-sm">{item.variant?.title}</span></p>
                    <p class="font-bold mt-1">{displayCurrency(item.total)}</p>
                </div>
            	</article>
            {/each}
          {/if}
          <div>
            {#if cart.length > 3}
              {@const remain = cart.length - 3}
            	<a href="/cart" class="btn btn-sm btn-ghost btn-block rounded-3xl">{`+ ${remain} produit${remain > 1 ? "s" : ""} `}</a>
            {/if}
            <div class="flex items-center justify-between w-full mt-2">
              <p>Total</p>
              <p class="text-right font-bold w-full text-lg">{displayCurrency(cartTotal)}</p>
            </div>
          </div>
        </div>
        <footer class="card-actions mb-4 mt-2 px-4">
          <a href="/cart" class="btn btn-primary btn-sm btn-block py-1 rounded-3xl">
            Mon panier
          </a>
        </footer>
      </div>
    </div>
    
    {#if user}
    <div class="hidden md:dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="https://i.pravatar.cc/300" />
        </div>
      </label>
      <ul
        tabindex="0"
        class="menu menu-md dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-72"
      >
        <li>
          <a class="justify-between" href="/user/profile">
            <p class="flex flex-row items-center gap-1">
              <IconUser color="#707070" />
              Profile
            </p>
          </a>
        </li>
        <li>
          <a href="/cart" class="justify-between">
            <p class="grow flex flex-row items-center gap-1">
            <IconShoppingBag color="#707070" />
            Mon panier
            </p>
            <div class="badge badge-secondary">{cart.length}</div>
          </a>
        </li>
        <!--li>
          <a href="/user/orders" class="justify-between">
            <p class="grow flex flex-row items-center gap-1">
              <IconShoppingCart color="#707070" />
              Mes commandes
            </p>
          </a>
        </li>
        <li>
          <a href="/user/addresses" class="justify-between">
            <p class="grow flex flex-row items-center gap-1">
            <IconMapPin color="#707070"/>
              Mon adresses
            </p>
          </a>
        </li-->

          <li>
            <a href="/auth/logout" class=" mt-4 btn btn-sm btn-error btn-outline rounded-3xl w-full">Déconnexion</a>
            </li>
        
      </ul>
    </div>
    {:else}
      <a class="btn btn-secondary rounded-3xl hidden lg:flex" href={`/auth/login?from=${$page.url.pathname === "/" ? "/home" : $page.url.pathname}`}>
        Connexion
      </a>
    {/if}
    
  </div>
      </div>
    <!-- END HEAD NAVBAR -->

    <!-- BOTTOM NAVBAR -->
    <div class="hidden md:flex lg:hidden flex-row gap-8 justify-center w-full">

      <!-- MENU -->
      <ul class="menu menu-horizontal rounded-box">
        <li>
          <a href="/">
            <IconHome color="#4b5563" />
            Accueil
          </a>
        </li>
        {#if categories.length > 0}
          <li>
            <details>
              <summary class="dropdown">
                <IconCategory color="#4b5563" />
                Catégories
              </summary>

              <ul class="menu w-64" id="categories-menu">
                {#each categories as category}
                  {#if !category.parent_category && category.category_children.length > 0}
                    <li>
                    <details>
                      <summary>{category.name}</summary>
                      <ul class="menu">
                      	{#each category.category_children as child}
                          {#if child.category_children.length > 0}
                          	<li>
                              <details>
                                <summary>{child.name}</summary>
                                <ul class="menu">
                                  {#each child.category_children as subchild}
                                  	<li><a href={`/store/categories/${subchild.handle}`}>{subchild.name}</a></li>
                                  {/each}
                                  <li class="border border-gray-300 rounded-lg bg-base-200"><a href={`/store/categories/${child.handle}`}>{child.name}</a></li>
                                </ul>
                              </details>
                            </li>
                            <li class="border border-gray-300 rounded-lg bg-base-200 mb-1"><a href={`/store/categories/${category.handle}`}>{category.name}</a></li>
                          {:else}
                            <li><a href={`/store/categories/${child.handle}`}>{child.name}</a></li>
                          {/if}
                        {/each}
                      </ul>
                    </details>
                    </li>
                  {:else if !category.parent_category_id}
                  	<li>
                      <a href={`/store/categories/${category.handle}`}>
                        {category.name}
                      </a>
                    </li>
                  {/if}
                {/each}
              </ul>
            </details>
          </li>
        {/if}
        <li>
          <a href="/store/collections">
            <IconCategory2 color="#4b5563" />
            Collections
          </a>
        </li>
        <li>
          <a href="/contact">
            <IconPhoneCall color="#4b5563" />
            Contactez-nous
          </a>
        </li>
      </ul>
      <!-- END MENU -->

      <!-- INFOS -->
      <ul class="menu menu-horizontal hidden">
        <li>
          <p>
            <IconPhone color="#4b5563" />
            {PHONE_NUM_AIRTEL}
          </p>
        </li>
        <li>
          <a href="mailto:info@trustmarket.store">
            <IconMail color="#4b5563" />
            info@trustmarket.store
          </a>
        </li>
      </ul>
      <!-- END INFOS -->
    </div>
    <!-- END BOTTOM NAVBAR -->
    </div>
</div>
