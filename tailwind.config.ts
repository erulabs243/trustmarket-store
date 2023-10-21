/** @type {import("tailwindcss").Config} */
import type { Config } from 'tailwindcss'

export default {
  content: ["./src/**/*.{html,js,ts,svelte}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["emerald"]
  }
} satisfies Config

