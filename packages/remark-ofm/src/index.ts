/// <reference types="remark-parse" />
/// <reference types="remark-stringify" />

import type { Root } from "mdast";
import type { Processor } from "unified";
import { ofm } from "@moritzrs/micromark-extension-ofm";
import { ofmToMarkdown, ofmFromMarkdown } from "@moritzrs/mdast-util-ofm";

export default function (): undefined {
	// @ts-expect-error - `this` is a processor
	const data = (this as Processor<Root>).data();

	data.micromarkExtensions ??= [];
	data.fromMarkdownExtensions ??= [];
	data.toMarkdownExtensions ??= [];

	data.micromarkExtensions.push(ofm());
	data.fromMarkdownExtensions.push(ofmFromMarkdown());
	data.toMarkdownExtensions.push(ofmToMarkdown());
}
