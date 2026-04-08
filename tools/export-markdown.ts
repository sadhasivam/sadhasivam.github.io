#!/usr/bin/env node

import { JSDOM } from "jsdom";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { getGeneratedArtifactPath, layout, profile } from "./constants";

async function exportMarkdown(): Promise<void> {
	console.log("📝 Exporting Markdown from HTML...");

	try {
		// Read the HTML file from src
		const htmlContent = await readFile(layout.src.html, "utf-8");

		// Parse HTML and extract the resume content
		const dom = new JSDOM(htmlContent);
		const document = dom.window.document;

		// Use profile for name and title
		const name = profile.name;
		const subtitle = profile.title;

		// Extract contact info
		const contactSection = document.querySelector(
			".border-t.border-gray-300.pt-2",
		);
		let contactInfo = "";
		if (contactSection) {
			const spans = contactSection.querySelectorAll(
				"span:not(.print\\:hidden)",
			);
			const contacts = Array.from(spans)
				.map((span) => span.textContent?.replace(/\s+/g, " ").trim())
				.filter((text) => text && !text.includes("Download PDF"));
			contactInfo = contacts.join(" | ");
		}

		// Extract main content sections (everything after header)
		const mainContent = document.querySelector(".space-y-4");

		let htmlToConvert = "";
		if (mainContent) {
			htmlToConvert = mainContent.innerHTML;

			// Remove bullet point spans using regex
			htmlToConvert = htmlToConvert.replace(
				/<span class="absolute -ml-4 text-indigo-500">•<\/span>/g,
				"",
			);
			htmlToConvert = htmlToConvert.replace(
				/<span class="absolute -ml-4 text-indigo-500">&#x2022;<\/span>/g,
				"",
			);
		}

		// Process through unified pipeline
		const file = await unified()
			.use(rehypeParse, { fragment: true })
			.use(rehypeRemark)
			.use(remarkStringify, {
				bullet: "-",
				emphasis: "*",
				strong: "*",
				fence: "`",
				fences: true,
				listItemIndent: "one",
			})
			.process(htmlToConvert);

		// Build the final markdown and clean up HTML comments
		let markdownContent = String(file);

		// Remove HTML comments
		markdownContent = markdownContent.replace(/<!--[\s\S]*?-->/g, "");

		// Remove bullet characters that appear after markdown bullets
		markdownContent = markdownContent.replace(/^- • /gm, "- ");
		markdownContent = markdownContent.replace(/^- &#x2022; /gm, "- ");

		// Remove extra blank lines (more than 2 consecutive)
		markdownContent = markdownContent.replace(/\n{3,}/g, "\n\n");

		const markdown = `# ${name}

**${subtitle}**

${contactInfo}

---

${markdownContent.trim()}
`;

		// Ensure generated directory exists
		await mkdir(layout.generated.root, { recursive: true });

		// Write to generated folder
		const outputPath = getGeneratedArtifactPath("markdown");;
		await writeFile(outputPath, markdown, "utf-8");

		console.log(`✅ Markdown exported to ${outputPath}`);
	} catch (error) {
		console.error("❌ Error exporting markdown:", error);
		process.exit(1);
	}
}

// Run the export
exportMarkdown();
