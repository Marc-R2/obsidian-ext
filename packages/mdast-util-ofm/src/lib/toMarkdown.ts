import type { Options } from "mdast-util-to-markdown";
import { ofmCalloutToMarkdown } from "@moritzrs/mdast-util-ofm-callout";
import { ofmTagToMarkdown } from "@moritzrs/mdast-util-ofm-tag";
import { ofmWikilinkToMarkdown } from "@moritzrs/mdast-util-ofm-wikilink";

/**
 * Create an extension for `mdast-util-to-markdown` to enable OFM in markdown.
 */
export function ofmToMarkdown(): Options {
	return {
		extensions: [ofmCalloutToMarkdown(), ofmTagToMarkdown(), ofmWikilinkToMarkdown()],
	};
}
