/**
 * Centralized configuration constants for the resume builder
 */
export const profile = {
	name: "Sadhasivam Jayabalaganesan",
	slug: "sadhasivam-jayabalaganesan",
	title: "Technology Leader | Platform Strategy & Innovation",
} as const;

export const layout = {
	src: {
		html: "src/index.html",
		styles: {
			screen: "src/styles/screen.css",
			print: "src/styles/print.css",
		},
	},

	docs: {
		root: "docs",
		html: "docs/index.html",
		css: {
			root: "docs/css",
			screen: "docs/css/screen.css",
			print: "docs/css/print.css",
		},
		assets: {
			fonts: "docs/assets/fonts",
		},
		resume: "docs/resume",
	},

	generated: {
		root: "generated",
	},

	assets: {
		fonts: "assets/fonts",
		favicon: "favicon.png",
	},
} as const;
