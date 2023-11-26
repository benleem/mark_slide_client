/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			animation: {
				"slide-up": "slide-up 0.2s ease-in"
			},
			keyframes: {
				"slide-up": {
					"0%": { transform: "translateY(100%)", opacity: 0 },
					"100%": { transform: "translateY(0%)", opacity: 1 }
				}
			}
		}
	},
	plugins: [require("@tailwindcss/typography")]
};
