import { writable } from "svelte/store";
import type { UserSession } from "$lib/types/commons";

const userStore = writable<UserSession | null>(null);

export default userStore;
