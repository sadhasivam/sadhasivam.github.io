#!/usr/bin/env node

import browserSync from "browser-sync";
import { watch } from "chokidar";
import { exec } from "node:child_process";
import { copyFile, mkdir } from "node:fs/promises";
import { promisify } from "node:util";

const execAsync = promisify(exec);
const bs = browserSync.create();

async function copyHTML(): Promise<void> {
	console.log("📄 Copying index.html...");
	await copyFile("src/index.html", "docs/index.html");
	console.log("✅ index.html copied");
}

async function buildCSS(): Promise<void> {
	console.log("🎨 Building CSS...");
	await execAsync("bun run build:css");
	console.log("✅ CSS built");
}

async function startWatch(): Promise<void> {
	console.log("👀 Starting live development server...\n");

	// Ensure docs directory exists
	await mkdir("docs", { recursive: true });

	// Initial build
	await copyHTML();
	await buildCSS();

	// Start browser-sync server
	bs.init({
		server: "./docs",
		port: 3000,
		open: false,
		notify: false,
		ui: false,
		logLevel: "info",
		logPrefix: "Live",
	});

	console.log("\n🚀 Live server running at http://localhost:3000");
	console.log("👀 Watching for changes...\n");

	// Watch HTML files
	const htmlWatcher = watch("src/index.html", {
		persistent: true,
		ignoreInitial: true,
	});

	htmlWatcher.on("change", async (path) => {
		console.log(`\n📝 ${path} changed`);
		await copyHTML();
		bs.reload();
	});

	// Watch CSS files
	const cssWatcher = watch("src/styles/**/*.css", {
		persistent: true,
		ignoreInitial: true,
	});

	cssWatcher.on("change", async (path) => {
		console.log(`\n🎨 ${path} changed`);
		await buildCSS();
		bs.reload("*.css");
	});

	// Graceful shutdown
	process.on("SIGINT", () => {
		console.log("\n\n👋 Shutting down...");
		htmlWatcher.close();
		cssWatcher.close();
		bs.exit();
		process.exit(0);
	});
}

// Run the watch server
startWatch().catch((error) => {
	console.error("❌ Watch server failed:", error);
	process.exit(1);
});
