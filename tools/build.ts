#!/usr/bin/env node

import { exec } from "node:child_process";
import { copyFile, cp, mkdir } from "node:fs/promises";
import { promisify } from "node:util";

const execAsync = promisify(exec);

async function build(): Promise<void> {
	console.log("🏗️  Building site...\n");

	try {
		// 1. Create output directories
		console.log("📁 Creating output directories...");
		await mkdir("docs", { recursive: true });
		await mkdir("docs/css", { recursive: true });
		await mkdir("docs/assets/fonts", { recursive: true });
		await mkdir("docs/downloads", { recursive: true });
		console.log("✅ Directories created\n");

		// 2. Copy index.html
		console.log("📄 Copying index.html...");
		await copyFile("src/index.html", "docs/index.html");
		console.log("✅ index.html copied\n");

		// 3. Build CSS
		console.log("🎨 Building CSS...");
		await execAsync("bun run build:css");
		console.log("✅ CSS built\n");

		// 4. Copy fonts
		console.log("🔤 Copying fonts...");
		await cp("assets/fonts", "docs/assets/fonts", { recursive: true });
		console.log("✅ Fonts copied\n");

		// 5. Copy favicon if exists
		try {
			await copyFile("favicon.png", "docs/favicon.png");
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

		// 7. Copy markdown to docs/downloads
		console.log("📄 Copying markdown to docs/downloads...");
		await copyFile(
			"generated/resume.md",
			"docs/downloads/sadhasivam-jayabalaganesan-resume.md",
		);
		console.log("✅ Markdown copied to docs/downloads\n");

		console.log("✅ Build complete! Site ready in docs/");
	} catch (error) {
		console.error("❌ Build failed:", error);
		process.exit(1);
	}
}

// Run the build
build();
