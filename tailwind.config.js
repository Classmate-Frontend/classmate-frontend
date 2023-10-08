/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		screens: {
			xs: "450px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
			"3xl": "1800px",
		},
		extend: {
			colors: {
				"classmate-green-1": "var(--classmate-green-1)",
				"classmate-green-2": "var(--classmate-green-2)",
				"classmate-green-3": "var(--classmate-green-3)",
				"classmate-green-4": "var(--classmate-green-4)",
				"classmate-green-5": "var(--classmate-green-5)",
				"classmate-green-6": "var(--classmate-green-6)",
				"classmate-green-7": "var(--classmate-green-7)",
				"classmate-gray-1": "var(--classmate-gray-1)",
				"classmate-gray-2": "var(--classmate-gray-2)",
				"classmate-gray-3": "var(--classmate-gray-3)",
				"classmate-gray-4": "var(--classmate-gray-4)",
				"classmate-gray-5": "var(--classmate-gray-5)",
				"classmate-gray-6": "var(--classmate-gray-6)",
				"classmate-pink-1": "var(--classmate-pink-1)",
				"classmate-gold-1": "var(--classmate-gold-1)",
				"classmate-tan-1": "var(--classmate-tan-1)",
				"classmate-tan-2": "var(--classmate-tan-2)",
				"classmate-red-1": "var(--classmate-red-1)",
				"classmate-error-red": "var(--classmate-error-red)",
				"classmate-hover-green-2": "var(--classmate-hover-green-2)",
			},
		},
	},
	plugins: [],
};
