import { ofmCalloutHtml } from "@moritzrs/micromark-extension-ofm-callout";
import { ofmTagHtml } from "@moritzrs/micromark-extension-ofm-tag";
import { ofmWikilinkHtml } from "@moritzrs/micromark-extension-ofm-wikilink";
import { combineHtmlExtensions, type HtmlExtension } from "micromark-util-combine-extensions";

export function ofmHtml(): HtmlExtension {
	return combineHtmlExtensions([ofmCalloutHtml(), ofmTagHtml(), ofmWikilinkHtml()]);
}
