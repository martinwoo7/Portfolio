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
		extend: {
			gridTemplateRows: {
				'7': 'repeat(7, minmax(0, 1fr))',
				'8': 'repeat(8, minmax(0, 1fr))',
			}
		},
	},
	plugins: [],
};
