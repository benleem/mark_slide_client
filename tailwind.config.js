/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				"main-dark": "#0d1117",
				"secondary-dark": "#161b22"
			},
			animation: {
				"fade-in-out": "fade-in-out 1.5s ease-in-out"
			},
			keyframes: {
				"fade-in-out": {
					"0%": { opacity: 0 },
					"25%": { opacity: 1 },
					"85%": { opacity: 1 },
					"100%": { opacity: 0 }
				}
			}
		}
	},
	plugins: [require("@tailwindcss/typography")]
};
