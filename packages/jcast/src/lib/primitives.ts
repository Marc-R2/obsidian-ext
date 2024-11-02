import type { Node } from "unist";

/**
 * The geometry of a node, defined by its position and size.
 * The origin is the top-left corner of the node.
 */
export interface Geometry {
	/** X Position */
	x: number;

	/** Y Position */
	y: number;

	/** Node Width */
	width: number;

	/** Node Height */
	height: number;
}

/**
 * A color in hexadecimal format.
 */
export type Color = `#${string}` | "1" | "2" | "3" | "4" | "5" | "6";

/**
 * The side of a node.
 */
export type Side = "top" | "right" | "bottom" | "left";

/**
 * The direction of an edge.
 */
export type Direction = "none" | "bidirectional" | "unidirectional" | "reverse";

/**
 * The target of an edge.
 */
export interface Target {
	/** Target node id */
	node: string;

	/** Target node side */
	side?: Side;
}

/**
 * The style of the background image.
 */
export type BackgroundStyle = "cover" | "ratio" | "repeat";

/**
 * A generic node.
 */
export interface GenericNode extends Node {
	/** Node id */
	id: string;

	/** Node geometry */
	geometry: Geometry;

	/** Node color */
	color?: Color;
}
