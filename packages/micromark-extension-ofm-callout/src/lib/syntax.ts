import type { Code, Effects, Extension, State, TokenizeContext } from "micromark-util-types";
import { markdownSpace } from "micromark-util-character";
import { factorySpace } from "micromark-factory-space";
import { constants, types } from "micromark-util-symbol";

// ASCI Codes
const SPACE = 32;
const EXCLAMATION_MARK = 33;
const PLUS = 43;
const MINUS = 45;
const GREATER_THAN = 62;
const SQUARE_BRACKET_OPEN = 91;
const SQUARE_BRACKET_CLOSE = 93;

/**
 * Create an extension for `micromark` to enable OFM callout syntax.
 */
export function ofmCallout(): Extension {
	return {
		document: {
			[GREATER_THAN]: {
				name: "ofmCallout",
				tokenize: tokenize,
				continuation: { tokenize: tokenizeContinuation },
				exit: exit,
				add: "before",
			},
		},
	};
}

/**
 * A tokenizer for Obsidian callout syntax.
 */
function tokenize(this: TokenizeContext, effects: Effects, ok: State, nok: State) {
	return start;

	/**
	 * Start of callout
	 *
	 * ```markdown
	 * > | > [!type]+ Title
	 *     ^
	 * ```
	 */
	function start(code: Code) {
		effects.enter("ofmCallout", { _container: true });
		effects.enter("ofmCalloutPrefix");
		effects.consume(code);
		return before_type;
	}

	/**
	 * Before callout type
	 *
	 * ```markdown
	 * > | > [!type]+ Title
	 *      ^^
	 * ```
	 */
	function before_type(code: Code) {
		if (code === SPACE) {
			effects.enter("ofmCalloutPrefixWhiteSpace");
			effects.consume(code);
			effects.exit("ofmCalloutPrefixWhiteSpace");
			return type_whitespace;
		}

		if (code === SQUARE_BRACKET_OPEN) {
			effects.enter("ofmCalloutType");
			effects.enter("ofmCalloutTypeMarker");
			effects.consume(code);
			effects.exit("ofmCalloutTypeMarker");
			return type_open;
		}

		return nok(code);
	}

	/**
	 * Inside whitespace before callout type
	 *
	 * ```markdown
	 * > | > [!type]+ Title
	 *      ^
	 * ```
	 */
	function type_whitespace(code: Code) {
		if (code !== SQUARE_BRACKET_OPEN) return nok(code);

		effects.enter("ofmCalloutType");
		effects.enter("ofmCalloutTypeMarker");
		effects.consume(code);
		effects.exit("ofmCalloutTypeMarker");
		return type_open;
	}

	/**
	 * After callout type marker
	 *
	 * ```markdown
	 * > | > [!type]+ Title
	 *       ^
	 * ```
	 */
	function type_open(code: Code) {
		if (code !== EXCLAMATION_MARK) return nok(code);

		effects.enter("ofmCalloutTypeMark");
		effects.consume(code);
		effects.exit("ofmCalloutTypeMark");
		return type_marker;
	}

	/**
	 * After callout type marker
	 *
	 * ```markdown
	 * > | > [!type]+ Title
	 *        ^
	 * ```
	 */
	function type_marker(code: Code) {
		if (!code || code < SPACE || code === SQUARE_BRACKET_CLOSE) return nok(code);

		effects.enter("ofmCalloutTypeValue");
		effects.consume(code);
		return type_content;
	}

	/**
	 * Inside callout type declaration
	 *
	 * ```markdown
	 * > | > [!type]+ Title
	 *         ^^^^
	 * ```
	 */
	function type_content(code: Code) {
		if (!code || code < SPACE) return nok(code);

		if (code === SQUARE_BRACKET_CLOSE) {
			effects.exit("ofmCalloutTypeValue");
			effects.enter("ofmCalloutTypeMarker");
			effects.consume(code);
			effects.exit("ofmCalloutTypeMarker");
			return type_close;
		}

		effects.consume(code);
		return type_content;
	}

	/**
	 * After callout type closing marker
	 *
	 * ```markdown
	 * > | > [!type]+ Title
	 *             ^
	 * ```
	 */
	function type_close(code: Code) {
		if (code === PLUS || code === MINUS) {
			effects.enter("ofmCalloutFoldable");
			effects.consume(code);
			effects.exit("ofmCalloutFoldable");
			effects.exit("ofmCalloutType");
			return type_foldable;
		}

		if (code === SPACE) {
			effects.exit("ofmCalloutType");
			effects.enter("ofmCalloutPrefixWhiteSpace");
			effects.consume(code);
			effects.exit("ofmCalloutPrefixWhiteSpace");
			return before_title;
		}

		if (!code || code < SPACE) {
			effects.exit("ofmCalloutType");
			effects.exit("ofmCalloutPrefix");
			return ok(code);
		}

		return nok(code);
	}

	/**
	 * After callout foldable marker
	 *
	 * ```markdown
	 * > | > [!type]+ Title
	 *              ^
	 * ```
	 */
	function type_foldable(code: Code) {
		if (code === SPACE) {
			effects.enter("ofmCalloutPrefixWhiteSpace");
			effects.consume(code);
			effects.exit("ofmCalloutPrefixWhiteSpace");
			return before_title;
		}

		if (!code || code < SPACE) {
			effects.exit("ofmCalloutPrefix");
			return ok(code);
		}

		return nok(code);
	}

	/**
	 * Before callout title
	 *
	 * ```markdown
	 * > | > [!type]+ Title
	 *               ^^
	 * ```
	 */
	function before_title(code: Code) {
		if (!code || code < SPACE) {
			effects.exit("ofmCalloutPrefix");
			return ok(code);
		}

		effects.enter("ofmCalloutTitle");
		effects.consume(code);
		return title;
	}

	/**
	 * Inside callout title
	 *
	 * ```markdown
	 * > | > [!type]+ Title
	 *                ^^^^^
	 * ```
	 */
	function title(code: Code) {
		if (!code || code < SPACE) {
			effects.exit("ofmCalloutTitle");
			effects.exit("ofmCalloutPrefix");
			return ok(code);
		}

		effects.consume(code);
		return title;
	}
}

function tokenizeContinuation(this: TokenizeContext, effects: Effects, ok: State, nok: State) {
	// eslint-disable-next-line @typescript-eslint/no-this-alias
	const self = this;
	return start;

	/**
	 * Start of callout continuation
	 *
	 * ```markdown
	 * > | > Content
	 *     ^
	 * ```
	 */
	function start(code: Code) {
		const state = self.containerState;
		if (!state!.calloutContent) effects.enter("ofmCalloutContent");

		if (markdownSpace(code)) {
			return factorySpace(
				effects,
				before_content,
				types.linePrefix,
				self.parser.constructs.disable.null?.includes("codeIndented")
					? undefined
					: constants.tabSize,
			)(code);
		}

		return before_content(code);
	}

	/**
	 * Before block quote marker
	 *
	 * ```markdown
	 * > | > Content
	 *     ^
	 * ```
	 */
	function before_content(code: Code) {
		if (code === GREATER_THAN) {
			effects.enter("ofmCalloutContentPrefix");
			effects.consume(code);
			return after_content;
		}

		return nok(code);
	}

	/**
	 * After block quote marker
	 *
	 * ```markdown
	 * > | > Content
	 *      ^
	 * ```
	 */
	function after_content(code: Code) {
		const state = self.containerState;
		if (state) state.calloutContent = true;
		effects.exit("ofmCalloutContentPrefix");
		return ok(code);
	}
}

function exit(this: TokenizeContext, effects: Effects) {
	const state = this.containerState;
	if (state?.calloutContent) {
		effects.exit("ofmCalloutContent");
	}

	if (state) state.calloutContent = false;

	effects.exit("ofmCallout");
	return undefined;
}
