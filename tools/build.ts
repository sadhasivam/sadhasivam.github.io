#!/usr/bin/env node

import { exec } from "node:child_process";
import { copyFile, cp, mkdir } from "node:fs/promises";
import { promisify } from "node:util";
import { getGeneratedArtifactPath, getPublishedArtifactPath, layout } from "./constants";

const execAsync = promisify(exec);

async function build(): Promise<void> {
	console.log("🏗️  Building site...\n");

	try {
		// 1. Create output directories
		console.log("📁 Creating output directories...");
		await mkdir(layout.docs.root, { recursive: true });
		await mkdir(layout.docs.css.root, { recursive: true });
		await mkdir(layout.docs.assets.fonts, { recursive: true });
		await mkdir(layout.docs.downloads, { recursive: true });
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

		// 6. Generate markdown
		console.log("📝 Generating markdown...");
		await execAsync("bun run export:md");
		console.log("✅ Markdown generated\n");

		// 7. Copy markdown to docs/resume
		console.log("📄 Copying markdown to docs/resume...");
		await copyFile(
			getGeneratedArtifactPath("markdown"),
			getPublishedArtifactPath("markdown"),
		);
		console.log("✅ Markdown copied to docs/resume\n");

		// 8. Generate PDF
		console.log("📄 Generating PDF...");
		await execAsync("bun run export:pdf");
		console.log("✅ PDF generated\n");

		// 9. Copy PDF to docs/resume
		console.log("📄 Copying PDF to docs/resume...");
		await copyFile(
			getGeneratedArtifactPath("pdf"),
			getPublishedArtifactPath("pdf"),
		);
		console.log("✅ PDF copied to docs/resume\n");

		console.log("✅ Build complete! Site ready in docs/");
	} catch (error) {
		console.error("❌ Build failed:", error);
		process.exit(1);
	}
}

// Run the build
build();
