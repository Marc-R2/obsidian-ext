import type { HtmlExtension } from "micromark-util-types";

/**
 * Create an HTML extension for `micromark` to support OFM tags when
 * serializing to HTML.
 */
export function ofmCalloutHtml(): HtmlExtension {
	const data: { title?: string; type: string; collapsed?: boolean }[] = [];

	return {
		enter: {
			ofmCallout() {
				data.push({ type: "info" });
			},
			ofmCalloutTypeValue(token) {
				data[data.length - 1].type = this.sliceSerialize(token);
			},
			ofmCalloutTitle(token) {
				data[data.length - 1].title = this.sliceSerialize(token);
			},
			ofmCalloutFoldable(token) {
				const fold = this.sliceSerialize(token);
				data[data.length - 1].collapsed = fold === "-";
			},
		},
		exit: {
			ofmCallout() {
				this.lineEndingIfNeeded();
				const info = data.pop();
				if (info?.collapsed !== undefined) {
					this.tag("</details>");
					this.lineEndingIfNeeded();
				}
				this.tag("</blockquote>");
			},

			ofmCalloutPrefix() {
				const { type, collapsed, title } = data[data.length - 1];
				this.tag(`<blockquote class="callout" data-type="${type}">`);
				this.lineEndingIfNeeded();

				if (collapsed !== undefined) {
					if (collapsed) this.tag(`<details>`);
					else this.tag(`<details open="">`);
					this.lineEndingIfNeeded();
				}

				// summary is title or capitalized type
				const summary = title || type.replace(/^\w/, (c) => c.toUpperCase());
				this.tag(`<summary>${summary}</summary>`);
				this.lineEndingIfNeeded();
			},
		},
	};
}
