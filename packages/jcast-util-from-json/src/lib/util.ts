import type { Edge, Node } from "@moritzrs/jsoncanvas";
import type { Geometry, CanvasNode, Direction } from "@moritzrs/jcast";

export function edgeDirection(edge: Edge): Direction {
	if (edge.fromEnd === edge.toEnd) {
		if (edge.fromEnd === "arrow") return "bidirectional";
		return "none";
	}

	if (edge.toEnd === "arrow") return "unidirectional";
	return "reverse";
}

export function geometryFromNode(node: Node): Geometry {
	return {
		x: node.x,
		y: node.y,
		width: node.width,
		height: node.height,
	};
}

export function isInsideNode(node: CanvasNode, parent: CanvasNode) {
	return (
		node.geometry.x >= parent.geometry.x &&
		node.geometry.y >= parent.geometry.y &&
		node.geometry.x + node.geometry.width <= parent.geometry.x + parent.geometry.width &&
		node.geometry.y + node.geometry.height <= parent.geometry.y + parent.geometry.height
	);
}
