/**
 * Centralized configuration constants for the resume builder
 */
import { join } from "node:path";

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
		downloads: "docs/resume",
	},

	generated: {
		root: "generated",
	},

	assets: {
		fonts: "assets/fonts",
		favicon: "favicon.png",
	},
} as const;

export const artifacts = {
	markdown: {
		fileName: `${profile.slug}-resume.md`,
		generatedPath: join(layout.generated.root, "resume.md"),
		publishedPath: join(layout.docs.downloads, `${profile.slug}-resume.md`),
	},
	pdf: {
		fileName: `${profile.slug}-resume.pdf`,
		generatedPath: join(layout.generated.root, "resume.pdf"),
		publishedPath: join(layout.docs.downloads, `${profile.slug}-resume.pdf`),
	},
} as const;

export type ExportFormat = keyof typeof artifacts;

export const getArtifact = (format: ExportFormat) => artifacts[format];

export const getGeneratedArtifactPath = (format: ExportFormat) =>
  artifacts[format].generatedPath;

export const getPublishedArtifactPath = (format: ExportFormat): string => {
	return artifacts[format].publishedPath;
};
