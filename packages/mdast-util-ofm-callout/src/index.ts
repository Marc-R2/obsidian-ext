declare module "mdast" {
	interface OfmCallout extends Parent {
		type: "ofmCallout";
		kind: string;
		title: string;
		folded?: boolean;
	}

	interface RootContentMap {
		ofmCallout: OfmCallout;
	}
}

export { ofmCalloutFromMarkdown } from "./lib/fromMarkdown.js";
export { ofmCalloutToMarkdown } from "./lib/toMarkdown.js";
