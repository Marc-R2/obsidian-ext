declare module "mdast" {
	interface OfmHighlight extends Literal {
		type: "ofmHighlight";
		value: string;
		pre: number;
		post: number;
	}

	interface RootContentMap {
		ofmHighlight: OfmHighlight;
	}

	interface PhrasingContentMap {
		ofmHighlight: OfmHighlight;
	}
}

export { ofmHighlightFromMarkdown } from "./lib/fromMarkdown.js";
export { ofmHighlightToMarkdown } from "./lib/toMarkdown.js";
