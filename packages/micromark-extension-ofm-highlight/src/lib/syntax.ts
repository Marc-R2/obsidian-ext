import type { Code, Effects, Extension, State, TokenizeContext } from "micromark-util-types";

// ASCII Codes
const TAB = 9;
const SPACE = 32;
const EQUALS = 61;

/**
 * Create an extension for `micromark` to enable OFM highlight syntax.
 * Highlights use ==text== syntax where the number of equal signs must match.
 */
export function ofmHighlight(): Extension {
	return {
		text: {
			[EQUALS]: {
				name: "ofmHighlight",
				tokenize: tokenize,
			},
		},
	};
}

/**
 * A tokenizer for Obsidian highlight syntax.
 * Highlights use ==text== syntax where the number of equal signs matters.
 */
function tokenize(this: TokenizeContext, effects: Effects, ok: State, nok: State) {
	let openingMarkerSize = 0;
	let closingMarkerSize = 0;
	return start;

	function start(code: Code) {
		if (code !== EQUALS) {
			return nok(code);
		}

		effects.enter("ofmHighlight");
		effects.enter("ofmHighlightMarker");
		effects.consume(code);
		openingMarkerSize = 1;
		return openingMarker;
	}

	function openingMarker(code: Code) {
		if (code === EQUALS) {
			effects.consume(code);
			openingMarkerSize++;
			return openingMarker;
		}

		if (openingMarkerSize < 2) {
			return nok(code);
		}

		effects.exit("ofmHighlightMarker");
		effects.enter("ofmHighlightContent");

		if (code === SPACE || code === null) {
			return nok(code);
		}

		effects.consume(code);
		return content;
	}

	function content(code: Code) {
		if (code === null) {
			effects.exit("ofmHighlightContent");
			effects.exit("ofmHighlight");
			return ok(code);
		}

		if (code === TAB) {
			return nok(code);
		}

		if (code === EQUALS) {
			// Start potential closing marker detection
			effects.exit("ofmHighlightContent");
			effects.enter("ofmHighlightMarker");
			effects.consume(code);
			closingMarkerSize = 1;
			return closingMarker;
		}

		effects.consume(code);
		return content;
	}

	function closingMarker(code: Code): State | ((code: Code) => (State | undefined)) | undefined {
		if (code === EQUALS) {
			effects.consume(code);
			closingMarkerSize++;
			return closingMarker;
		}

		if (closingMarkerSize >= 2) {
			effects.exit("ofmHighlightMarker");
			effects.exit("ofmHighlight");
			return ok(code);
		}

		// Single equals - not a valid closing marker
		// Exit the marker and continue as content, but consume the single = as content
		effects.exit("ofmHighlightMarker");
		effects.enter("ofmHighlightContent");
		
		// The single = was already consumed in the marker, it will be processed by mdast utility
		return content(code);
	}
}