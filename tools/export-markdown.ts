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

		// Extract contact info (preserving links)
		const contactSection = document.querySelector(
			".border-t.border-gray-300.pt-2",
		);
		let contactInfo = "";
		if (contactSection) {
			const directChildren = contactSection.querySelector("div")?.children;
			if (!directChildren) return;

			const contacts: string[] = [];

			for (const element of Array.from(directChildren)) {
				// Skip separator spans
				const text = element.textContent?.trim();
				if (text === "|") continue;

				// Check for links within the element
				const link = element.querySelector("a");
				if (link) {
					const linkText = link.textContent?.replace(/\s+/g, " ").trim();
					const href = link.getAttribute("href");
					// Skip Resume download link (not useful in markdown format)
					if (linkText && href && !linkText.includes("Resume")) {
						contacts.push(`[${linkText}](${href})`);
					}
					continue;
				}

				// Check for email button - use noscript fallback only
				const button = element.querySelector("button#email-btn");
				if (button) {
					const noscriptSpan = element.querySelector("noscript span");
					if (noscriptSpan) {
						contacts.push(noscriptSpan.textContent?.trim() || "");
					}
					continue;
				}

				// For plain text (like location)
				const textContent = element.textContent?.replace(/\s+/g, " ").trim();
				if (textContent) {
					contacts.push(textContent);
				}
			}

			contactInfo = contacts.filter((c) => c).join(" | ");
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
