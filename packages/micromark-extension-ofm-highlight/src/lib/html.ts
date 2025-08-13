import type { HtmlExtension } from "micromark-util-types";

/**
 * Create an HTML extension for `micromark` to support OFM tags when
 * serializing to HTML.
 */
export function ofmHighlightHtml(): HtmlExtension {
	return {
		enter: {
			ofmHighlight() {
				this.tag('<mark class="highlight">');
			},
			ofmHighlightContent(token) {
				this.tag(this.encode(this.sliceSerialize(token)));
			},
			ofmHighlightMarker(token) {
				// Handle failed markers (single =) by including them in HTML output
				const markerText = this.sliceSerialize(token);
				if (markerText.length < 2) {
					// This is a failed marker, include it as content
					this.tag(this.encode(markerText));
				}
				// Valid markers (>=2 =) are handled by the tokenizer structure, not output as content
			},
		},
		exit: {
			ofmHighlight() {
				this.tag("</mark>");
			},
		},
	};
}
