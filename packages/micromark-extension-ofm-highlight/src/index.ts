declare module "micromark-util-types" {
	interface TokenTypeMap {
		ofmHighlight: "ofmHighlight";
		ofmHighlightMarker: "ofmHighlightMarker";
		ofmHighlightContent: "ofmHighlightContent";
	}
}

export { ofmHighlight } from "./lib/syntax.js";
export { ofmHighlightHtml } from "./lib/html.js";
