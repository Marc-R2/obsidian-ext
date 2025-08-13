import type { Extension } from "mdast-util-from-markdown";

/**
 * Create an extension for `mdast-util-from-markdown` to enable OFM highlights in markdown.
 */
export function ofmHighlightFromMarkdown(): Extension {
	return {
		enter: {
			ofmHighlight: function (token) {
				this.enter({ type: "ofmHighlight", value: "", pre: 0, post: 0 }, token);
			},
			ofmHighlightMarker: function (token) {
				const node = this.stack.at(-1);
				if (node?.type === "ofmHighlight") {
					const markerText = this.sliceSerialize(token);
					const markerSize = markerText.length;

					// If pre is 0, this is the opening marker
					if (node.pre === 0) {
						node.pre = markerSize;
					} else if (markerSize >= 2) {
						// This is a valid closing marker
						node.post = markerSize;
					} else {
						// This is a failed closing marker (single =)
						// Treat it as content instead
						node.value += markerText;
					}
				}
			},
			ofmHighlightContent: function (token) {
				const node = this.stack.at(-1);
				if (node?.type === "ofmHighlight") {
					const contentText = this.sliceSerialize(token);
					// Always append content, handling multiple content tokens
					node.value += contentText;
				}
			},
		},
		exit: {
			ofmHighlight: function (token) {
				this.exit(token);
			},
		},
	};
}
