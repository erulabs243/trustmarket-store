/** @type {import("tailwindcss").Config} */
import type { Config } from "tailwindcss";

export default {
	content: ["./src/**/*.{html,js,ts,svelte}"],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				brand: {
					"color-scheme": "light",
					primary: "#ff6300",
					secondary: "#b35100",
					accent: "#ffba80",
					neutral: "#2a323c",
					"base-100": "#f2f2f2",
					info: "#3abff8",
					success: "#36d399",
					warning: "#fbbd23",
					error: "#f87272",
				},
			},
		],
	},
} satisfies Config;
