#!/usr/bin/env node

import { exec } from "node:child_process";
import { copyFile, cp, mkdir } from "node:fs/promises";
import { promisify } from "node:util";
import {
	type ExportFormat,
	artifacts,
	getGeneratedArtifactPath,
	getPublishedArtifactPath,
} from "./buildArtifacts";
import { layout } from "./constants";

const execAsync = promisify(exec);

const getExportCommand = (format: ExportFormat): string =>
	`bun run export:${format}`;

const formats = Object.keys(artifacts) as ExportFormat[];

const directories = [
	layout.docs.css.root,
	layout.docs.assets.fonts,
	layout.docs.resume,
];

async function exportFormat(format: ExportFormat) {
	console.log(`📝 Generating ${format}...`);
	await execAsync(getExportCommand(format));

	console.log(`📄 Publishing ${format}...`);
	await copyFile(
		getGeneratedArtifactPath(format),
		getPublishedArtifactPath(format),
	);

	console.log(`✅ ${format} ready\n`);
}

async function build(): Promise<void> {
	console.log("🏗️  Building site...\n");

	try {
		// 1. Create output directories
		console.log("📁 Creating output directories...");
		await Promise.all(
			directories.map((dir) => mkdir(dir, { recursive: true })),
		);
		console.log("✅ Directories created\n");

		// 2. Copy index.html
		console.log("📄 Copying index.html...");
		await copyFile(layout.src.html, layout.docs.html);
		console.log("✅ index.html copied\n");

		// 3. Build CSS
		console.log("🎨 Building CSS...");
		await execAsync("bun run build:css");
		console.log("✅ CSS built\n");

		// 4. Copy fonts
		console.log("🔤 Copying fonts...");
		await cp(layout.assets.fonts, layout.docs.assets.fonts, {
			recursive: true,
		});
		console.log("✅ Fonts copied\n");

		// 5. Copy favicon if exists
		try {
			await copyFile(
				layout.assets.favicon,
				`${layout.docs.root}/${layout.assets.favicon}`,
			);
			console.log("✅ Favicon copied\n");
		} catch (err) {
			console.log(
				`ℹ️  No favicon.png found (skipping): ${err instanceof Error ? err.message : err}\n`,
			);
		}

		// 6. Generate markdown & pdf
		await Promise.all(formats.map(exportFormat));

		console.log("✅ Build complete! Site ready in docs/");
	} catch (error) {
		console.error("❌ Build failed:", error);
		process.exit(1);
	}
}

// Run the build
build();
