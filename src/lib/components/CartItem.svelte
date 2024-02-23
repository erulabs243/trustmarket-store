<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import api from "$lib/apiClient";
  import type { LineItemType } from "$lib/types/apiType";
  import { displayCurrency } from "$lib/utils/lang";
  import { fail } from "@sveltejs/kit";
  import { IconEdit, IconTrash } from "@tabler/icons-svelte";
  import { cartStore, cartTotalStore } from "$lib/stores/cart";
    import type { CartRes } from "$lib/types/apiResponse";
  
  type Processing = "deleting" | "updating" | null;

  export let item: LineItemType;
  
  let processing: Processing = null;
  let qty: number = item.quantity;

  //FIXME item quantity after delete update

  //Update line item in cart
  const updateCart = async () => {
    processing = "updating";
    const url = `carts/${item.cart_id}/line-items/${item.id}`;
    const res = (await api.post(url, { json: { quantity: Number(qty) } }).json()) as CartRes;

    if (!res)
      throw fail(400, { text: "Impossible de mettre à jour votre panier." });

    $cartStore = res.cart.items;
    $cartTotalStore = Number(res.cart.total);
    invalidateAll();
    processing = null;
  };

  //Delete line item from cart
  const deleteItem = async () => {
    processing = "deleting";
    const url = `carts/${item.cart_id}/line-items/${item.id}`;
    const res = (await api.delete(url).json()) as CartRes;

    if (!res) throw fail(400, { text: "Impossible to delete the item" });

    $cartStore = res.cart.items;
    $cartTotalStore = Number(res.cart.total);
    invalidateAll();
    processing = null;
  };
</script>

<div class="flex flex-col lg:flex-row border-b border-gray-700 gap-8 rounded-none bg-base-200 p-4">
  <figure class="w-full lg:w-40">
    <img
      src={item.thumbnail}
      alt={item.title}
      class="max-w-32 mx-auto max-h-32 object-cover rounded-xl"
    />
  </figure>

  <div class="flex flex-col lg:flex-row items-center gap-4 w-full">
    <div class="w-full lg:w-2/6">
      <h3 class="text-center lg:text-left text-xl font-bold text-gray-700">{item.title}</h3>
      <p class="text-center text-gray-700">{`${item.quantity} x ${displayCurrency(item.unit_price)}`}</p>
    </div>
    <div class="w-full lg:w-1/6 flex justify-center items-center">
      <span class="mr-4 text-lg text-gray-700 lg:hidden">Modèle</span>
      <button class="btn btn-outline btn-neutral rounded-xl">
        {item.variant?.title}
      </button>
    </div>
    <div class="w-full lg:w-1/6">
      <form>
        <div class="flex gap-2 w-full justify-center">
          <div class="form-control w-3/4">
            <input
              type="number"
              bind:value={qty}
              name="quantity"
              class="input input-bordered bg-base-200"
            />
          </div>
          <button
            class="btn btn-circle btn-secondary btn-square rounded-xl"
            on:click={updateCart}
          >
            {#if processing === "updating"}
              <span class="loading loading-spinner" />
            {:else}
              <IconEdit />
            {/if}
          </button>
        </div>
      </form>
    </div>
    <div class="w-1/6 flex justify-center">
      <button
        class="btn btn-outline btn-square btn-error rounded-xl"
        on:click={deleteItem}
      >
        {#if processing === "deleting"}
          <span class="loading loading-spinner" />
        {:else}
          <IconTrash size={18} />
        {/if}
      </button>
    </div>
    <div class="flex items-center justify-center gap-2 w-1/6">
      <p class="text-gray-700 lg:hidden">Prix</p>
      <p class="font-bold text-gray-700 text-lg">{displayCurrency(item.subtotal)}</p>
    </div>
  </div>
</div>
