import { ofmCallout } from "@moritzrs/micromark-extension-ofm-callout";
import { ofmTag } from "@moritzrs/micromark-extension-ofm-tag";
import { ofmWikilink } from "@moritzrs/micromark-extension-ofm-wikilink";
import { combineExtensions, type NormalizedExtension } from "micromark-util-combine-extensions";

export function ofm(): NormalizedExtension {
	return combineExtensions([ofmCallout(), ofmTag(), ofmWikilink()]);
}
