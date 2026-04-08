/**
 * Build artifact configuration and helpers
 */
import { join } from "node:path";
import { layout, profile } from "./constants";

export const artifacts = {
	markdown: {
		fileName: `${profile.slug}-resume.md`,
		generatedPath: join(layout.generated.root, "resume.md"),
		publishedPath: join(layout.docs.resume, `${profile.slug}-resume.md`),
	},
	pdf: {
		fileName: `${profile.slug}-resume.pdf`,
		generatedPath: join(layout.generated.root, "resume.pdf"),
		publishedPath: join(layout.docs.resume, `${profile.slug}-resume.pdf`),
	},
} as const;

export type ExportFormat = keyof typeof artifacts;

export const getArtifact = (format: ExportFormat) => artifacts[format];

export const getGeneratedArtifactPath = (format: ExportFormat) =>
	artifacts[format].generatedPath;

export const getPublishedArtifactPath = (format: ExportFormat): string => {
	return artifacts[format].publishedPath;
};
