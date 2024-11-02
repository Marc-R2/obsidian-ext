import type { HtmlExtension } from "micromark-util-types";

/**
 * Create an HTML extension for `micromark` to support OFM tags when
 * serializing to HTML.
 */
export function ofmTagHtml(): HtmlExtension {
	return {
		enter: {
			ofmTag() {
				this.tag('<span class="tag">');
			},
			ofmTagContent(token) {
				this.tag(this.encode(this.sliceSerialize(token)));
			},
		},
		exit: {
			ofmTag() {
				this.tag("</span>");
			},
		},
	};
}
