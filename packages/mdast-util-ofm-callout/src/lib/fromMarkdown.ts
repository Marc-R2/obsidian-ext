import type { Extension } from "mdast-util-from-markdown";

/**
 * Create an extension for `mdast-util-from-markdown` to enable OFM callouts in markdown.
 */
export function ofmCalloutFromMarkdown(): Extension {
	return {
		enter: {
			ofmCallout(token) {
				this.enter(
					{
						type: "ofmCallout",
						kind: "info",
						folded: undefined,
						title: "Info",
						children: [],
					},
					token,
				);
			},
			ofmCalloutTypeValue(token) {
				const node = this.stack[this.stack.length - 1];
				if (node.type === "ofmCallout") {
					node.kind = this.sliceSerialize(token);
					node.title = node.kind.replace(/^\w/, (c) => c.toUpperCase());
				}
			},
			ofmCalloutTitle(token) {
				const node = this.stack[this.stack.length - 1];
				if (node.type === "ofmCallout") {
					node.title = this.sliceSerialize(token);
				}
			},
			ofmCalloutFoldable(token) {
				const node = this.stack[this.stack.length - 1];
				if (node.type === "ofmCallout") {
					node.folded = this.sliceSerialize(token) === "-";
				}
			},
		},

		exit: {
			ofmCallout(token) {
				this.exit(token);
			},
		},
	};
}
