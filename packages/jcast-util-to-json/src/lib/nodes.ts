import type { CanvasNode, Edge, FileNode, GroupNode, LinkNode, TextNode } from "@moritzrs/jcast";
import type {
	Node as JsonCanvasNode,
	Edge as JsonCanvasEdge,
	FileNode as JsonCanvasFileNode,
	GroupNode as JsonCanvasGroupNode,
	LinkNode as JsonCanvasLinkNode,
	TextNode as JsonCanvasTextNode,
} from "@moritzrs/jsoncanvas";
import { recalculateGroupGeometry } from "./utils.js";

export function fromTextNode(node: TextNode): JsonCanvasTextNode {
	return {
		id: node.id,
		type: "text",
		text: node.value,
		x: node.geometry.x,
		y: node.geometry.y,
		width: node.geometry.width,
		height: node.geometry.height,
		color: node.color,
	};
}

export function fromFileNode(node: FileNode): JsonCanvasFileNode {
	return {
		id: node.id,
		type: "file",
		file: node.value,
		x: node.geometry.x,
		y: node.geometry.y,
		width: node.geometry.width,
		height: node.geometry.height,
		color: node.color,
	};
}

export function fromLinkNode(node: LinkNode): JsonCanvasLinkNode {
	return {
		id: node.id,
		type: "link",
		url: node.value,
		x: node.geometry.x,
		y: node.geometry.y,
		width: node.geometry.width,
		height: node.geometry.height,
		color: node.color,
	};
}

export function fromGroupNode(node: GroupNode): JsonCanvasGroupNode {
	const geometry = recalculateGroupGeometry(node);
	return {
		id: node.id,
		type: "group",
		label: node.value || undefined,
		x: geometry.x,
		y: geometry.y,
		width: geometry.width,
		height: geometry.height,
		color: node.color,
	};
}

export function fromNode(node: CanvasNode): JsonCanvasNode {
	switch (node.type) {
		case "text":
			return fromTextNode(node);
		case "file":
			return fromFileNode(node);
		case "link":
			return fromLinkNode(node);
		case "group":
			return fromGroupNode(node);
	}
}

export function fromEdge(edge: Edge): JsonCanvasEdge {
	return {
		id: edge.id,
		fromNode: edge.from.node,
		fromSide: edge.from.side,
		fromEnd:
			edge.direction === "none" || edge.direction === "unidirectional" ? "none" : "arrow",
		toNode: edge.to.node,
		toSide: edge.to.side,
		toEnd: edge.direction === "reverse" || edge.direction === "none" ? "none" : "arrow",
		label: edge.value || undefined,
		color: edge.color,
	};
}
