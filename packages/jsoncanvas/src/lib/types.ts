/**
 * The color type is used to encode color data for nodes and edges.
 * A color can either be a hex color code or one of the predefined colors:
 * - "1" (red)
 * - "2" (orange)
 * - "3" (yellow)
 * - "4" (green)
 * - "5" (cyan)
 * - "6" (purple)
 */
export type Color = `#${string}` | "1" | "2" | "3" | "4" | "5" | "6";

/**
 * The side type is used to encode the side of a node from which an edge originates or to which it points.
 */
export type Side = "top" | "right" | "bottom" | "left";

/**
 * The edge end type is used to encode the shape of the end of an edge.
 */
export type EdgeEnd = "none" | "arrow";

/**
 * Edges are lines that connect nodes to another.
 */
export type Edge = {
	/** Unique id for the edge */
	id: string;

	/** Id of the node from which the edge originates */
	fromNode: string;

	/** Side of the node from which the edge originates */
	fromSide?: Side;

	/** Shape of the end of the edge from which it originates */
	fromEnd: EdgeEnd;

	/** Id of the node to which the edge points */
	toNode: string;

	/** Side of the node to which the edge points */
	toSide?: Side;

	/** Shape of the end of the edge to which it points */
	toEnd: EdgeEnd;

	/** Color of the edge */
	color?: Color;

	/** Label for the edge */
	label?: string;
};

type CanvasNode<T> = {
	/** Unique id for the node */
	id: string;

	/** Type of the node */
	type: string;

	/** x-coordinate of the node */
	x: number;

	/** y-coordinate of the node */
	y: number;

	/** width of the node */
	width: number;

	/** height of the node */
	height: number;

	/** color of the node */
	color?: Color;
} & T;

/**
 * Text type nodes store text.
 */
export type TextNode = CanvasNode<{
	type: "text";

	/** Text content */
	text: string;
}>;

/**
 * File type nodes reference other files or attachments, such as images or videos.
 */
export type FileNode = CanvasNode<{
	type: "file";

	/** Path to the file */
	file: string;

	/** Subpath to heading or block. Must start with `#` */
	subpath?: `#${string}`;
}>;

/**
 * Link type nodes reference a URL.
 */
export type LinkNode = CanvasNode<{
	type: "link";

	/** URL */
	url: string;
}>;

/**
 * Group Nodes are used as visual containers for nodes within it.
 */
export type GroupNode = CanvasNode<{
	type: "group";

	/** Label for the group */
	label?: string;

	/** Path to a background image */
	background?: string;

	/** Style for the background image */
	backgroundStyle?: "cover" | "ratio" | "repeat";
}>;

/**
 * A Node is either a TextNode, FileNode, LinkNode, or GroupNode.
 */
export type Node = TextNode | FileNode | LinkNode | GroupNode;

/**
 * A Canvas is a collection of nodes and edges.
 */
export type JSONCanvas = {
	/** array of nodes */
	nodes: Node[];

	/** array of edges */
	edges: Edge[];
};
