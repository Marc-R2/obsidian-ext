import type { Extension } from "mdast-util-from-markdown";
import { ofmCalloutFromMarkdown } from "@moritzrs/mdast-util-ofm-callout";
import { ofmWikilinkFromMarkdown } from "@moritzrs/mdast-util-ofm-wikilink";
import { ofmTagFromMarkdown } from "@moritzrs/mdast-util-ofm-tag";

/**
 * Create an extension for `mdast-util-from-markdown` to enable OFM in markdown.
 */
export function ofmFromMarkdown(): Extension[] {
	return [ofmCalloutFromMarkdown(), ofmTagFromMarkdown(), ofmWikilinkFromMarkdown()];
}
