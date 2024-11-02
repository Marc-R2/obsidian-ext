import type { Options } from "mdast-util-to-markdown";
/**
 * Create an extension for `mdast-util-to-markdown` to enable OFM callouts in markdown.
 */
export function ofmCalloutToMarkdown(): Options {
	return {
		handlers: {
			ofmCallout(node, _, state, info) {
				const { kind, title, folded } = node;

				let folding = "";
				if (folded === true) folding = "-";
				if (folded === false) folding = "+";

				const prefix = `> [!${kind}]${folding} ${title}\n`;

				let content = state.containerFlow(node, info);
				if (content)
					content = state.indentLines(
						content,
						(line, _, blank) => ">" + (blank ? "" : " ") + line,
					);

				return prefix + content;
			},
		},
	};
}
