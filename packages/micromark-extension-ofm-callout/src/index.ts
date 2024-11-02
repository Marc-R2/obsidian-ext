declare module "micromark-util-types" {
	interface TokenTypeMap {
		ofmCallout: "ofmCallout";
		ofmCalloutPrefixWhiteSpace: "ofmCalloutWhiteSpace";
		ofmCalloutPrefix: "ofmCalloutPrefix";
		ofmCalloutType: "ofmCalloutType";
		ofmCalloutTypeMarker: "ofmCalloutTypeMarker";
		ofmCalloutTypeMark: "ofmCalloutTypeMark";
		ofmCalloutTypeValue: "ofmCalloutTypeValue";
		ofmCalloutFoldable: "ofmCalloutFoldable";
		ofmCalloutTitle: "ofmCalloutTitle";
		ofmCalloutContent: "ofmCalloutContent";
		ofmCalloutContentPrefix: "ofmCalloutContentPrefix";
	}

	interface ContainerState {
		calloutContent?: boolean;
	}
}

export { ofmCallout } from "./lib/syntax.js";
export { ofmCalloutHtml } from "./lib/html.js";
