import type { PageServerLoad, Actions } from "./$types";

export const load = (async ({cookies}) => {

  const email = cookies.get("email");
  
  return {
    title: email
  }
}) satisfies PageServerLoad;

export const actions = {
  default: async ({request, cookies}) => {
    const form = await request.formData();
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    console.info(email, password);
    cookies.set("email", email);
  }
} satisfies Actions;