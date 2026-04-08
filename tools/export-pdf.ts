#!/usr/bin/env node

import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
import { getGeneratedArtifactPath, layout } from "./constants";

async function exportPDF(): Promise<void> {
	console.log("📄 Generating PDF from HTML...");

	try {
		// Ensure output directory exists
		await mkdir(layout.generated.root, { recursive: true });

		// Launch headless browser
		console.log("🚀 Launching browser...");
		const browser = await chromium.launch({
			headless: true,
		});

		const page = await browser.newPage();

		// Load the built HTML file
		const htmlPath = `${process.cwd()}/${layout.docs.html}`;
		console.log(`📂 Loading file: ${htmlPath}`);
		await page.goto(`file://${htmlPath}`, {
			waitUntil: "networkidle",
		});

		// Wait for fonts to load
		await page.waitForTimeout(500);

		// Generate PDF to generated folder
		const outputPath = getGeneratedArtifactPath("pdf");

		console.log("🖨️  Generating PDF...");
		await page.pdf({
			path: outputPath,
			format: "Letter", // 8.5" x 11" US Letter size
			printBackground: true,
			margin: {
				top: "0",
				right: "0",
				bottom: "0",
				left: "0",
			},
		});

		await browser.close();

		console.log(`✅ PDF exported to ${outputPath}`);
	} catch (error) {
		console.error("❌ Error exporting PDF:", error);
		process.exit(1);
	}
}

// Run the export
exportPDF();
