import type { Options } from "mdast-util-to-markdown";

/**
 * Create an extension for `mdast-util-to-markdown` to enable OFM highlights in markdown.
 */
export function ofmHighlightToMarkdown(): Options {
	return {
		handlers: {
			ofmHighlight(node) {
				const value = node.value;
				const pre: number = node.pre;
				const post: number = node.post;
				return `${"=".repeat(pre)}${value}${"=".repeat(post)}`;
			},
		},
	};
}
