import type { Extension } from "mdast-util-from-markdown";

/**
 * Create an extension for `mdast-util-from-markdown` to enable OFM tags in markdown.
 */
export function ofmTagFromMarkdown(): Extension {
	return {
		enter: {
			ofmTag: function (token) {
				this.enter({ type: "ofmTag", value: "" }, token);
			},
			ofmTagContent: function (token) {
				const node = this.stack.at(-1);
				if (node?.type === "ofmTag") node.value = this.sliceSerialize(token);
			},
		},
		exit: {
			ofmTag: function (token) {
				this.exit(token);
			},
		},
	};
}
