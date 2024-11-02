import type { Literal, Parent } from "unist";
import type { BackgroundStyle, Color, Direction, GenericNode, Target } from "./primitives.js";

/**
 * Edges are used to connect nodes.
 */
export interface Edge extends Literal {
	type: "edge";

	/** Edge id */
	id: string;

	/** Edge label */
	value: string;

	/** From node */
	from: Target;

	/** To node */
	to: Target;

	/** Direction or arrow of the edge */
	direction: Direction;

	/** Edge color */
	color?: Color;
}

/**
 * Text Nodes are used to display text.
 * There value is most likely a markdown string.
 */
export interface TextNode extends GenericNode, Literal {
	type: "text";

	/** Text or markdown content */
	value: string;
}

/**
 * File Nodes are used to display files.
 * There value is the path to the file.
 */
export interface FileNode extends GenericNode, Literal {
	type: "file";

	/** Path to file */
	value: string;
}

/**
 * Link Nodes are used to display links.
 * There value is the URL of the link.
 */
export interface LinkNode extends GenericNode, Literal {
	type: "link";

	/** URL of link */
	value: string;
}

/**
 * Group Nodes are used to group other nodes.
 * They have no geometry (deviating from the JSON Canvas spec) since they are positioned by their children.
 */
export interface GroupNode extends GenericNode, Literal, Parent {
	type: "group";

	/** Group Label */
	value: string;

	/** Group Children */
	children: CanvasNode[];

	/** Path to background image */
	background?: string;

	/** Style of background image */
	backgroundStyle?: BackgroundStyle;
}

/**
 * Represents a Node on JSON Canvas
 */
export type CanvasNode = TextNode | FileNode | LinkNode | GroupNode;

/**
 * JSON Canvas Root Node
 */
export interface Root extends Parent {
	type: "root";
	children: (CanvasNode | Edge)[];
}
