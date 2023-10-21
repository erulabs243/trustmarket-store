import type { PageServerLoad } from "./$types";

export const load = (async () => {
  return {
    title: "Collection",
    text: "Holidays"
  };
}) satisfies PageServerLoad;