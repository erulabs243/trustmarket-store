<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import api from "$lib/apiClient";
  import type { CartRes } from "$lib/types/apiResponse";
  import type { LineItemType } from "$lib/types/apiType";
  import { displayCurrency } from "$lib/utils/lang";
  import { fail } from "@sveltejs/kit";
  import { IconEdit, IconTrash } from "@tabler/icons-svelte";

  type Processing = "deleting" | "updating" | null;

  export let item: LineItemType;
  let processing: Processing = null;
  let qty: number = item.quantity;

  const updateCart = async () => {
    console.log(`${item.title}, ${qty}`);
  };

  const deleteItem = async () => {
    processing = "deleting";
    const url = `carts/${item.cart_id}/line-items/${item.id}`;
    const res = await api.delete(url).json();

    if (!res) throw fail(400, { text: "Impossible to delete the item" });

    invalidateAll();
    processing = null;
  };
</script>

<div class="flex gap-8 rounded-none bg-base-200 p-4">
  <figure>
    <img
      src={item.thumbnail}
      alt={item.title}
      class="max-w-32 max-h-32 object-cover rounded-xl"
    />
  </figure>
  <div class="flex items-center gap-4 w-full">
    <div class="w-2/6">
      <h3>{item.title}</h3>
      <p>{`${item.quantity} x ${displayCurrency(item.unit_price)}`}</p>
    </div>
    <div class="w-1/6">
      <button class="btn btn-outline btn-neutral rounded-xl">
        {item.variant?.title}
      </button>
    </div>
    <div class="w-1/6">
      <form method="post">
        <div class="flex gap-2 w-full justify-center">
          <div class="form-control w-3/4">
            <input
              type="number"
              value={item.quantity.toString()}
              name="quantity"
              class="input input-bordered bg-base-200"
            />
          </div>
          <button
            class="btn btn-circle btn-primary btn-square rounded-xl"
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
    <div class="w-1/6">
      <p>{displayCurrency(item.subtotal)}</p>
    </div>
  </div>
</div>
