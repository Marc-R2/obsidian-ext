declare module "micromark-util-types" {
	interface TokenTypeMap {
		ofmTag: "ofmTag";
		ofmTagMarker: "ofmTagMarker";
		ofmTagContent: "ofmTagContent";
	}
}

export { ofmTag } from "./lib/syntax.js";
export { ofmTagHtml } from "./lib/html.js";
