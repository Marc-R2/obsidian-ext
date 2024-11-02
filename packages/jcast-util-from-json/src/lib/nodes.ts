import {
	type Edge as JsonCanvasEdge,
	type Node as JsonCanvasNode,
	type TextNode as JsonCanvasTextNode,
	type FileNode as JsonCanvasFileNode,
	type LinkNode as JsonCanvasLinkNode,
	type GroupNode as JsonCanvasGroupNode,
} from "@moritzrs/jsoncanvas";
import type { Edge, GroupNode, TextNode, FileNode, LinkNode, CanvasNode } from "@moritzrs/jcast";
import { edgeDirection, geometryFromNode } from "./util.js";

function fromTextNode(node: JsonCanvasTextNode): TextNode {
	return {
		type: "text",
		id: node.id,
		value: node.text,
		geometry: geometryFromNode(node),
		color: node.color,
	};
}

function fromFileNode(node: JsonCanvasFileNode): FileNode {
	return {
		type: "file",
		id: node.id,
		value: node.file,
		geometry: geometryFromNode(node),
		color: node.color,
	};
}

function fromLinkNode(node: JsonCanvasLinkNode): LinkNode {
	return {
		type: "link",
		id: node.id,
		value: node.url,
		geometry: geometryFromNode(node),
		color: node.color,
	};
}

function fromGroupNode(node: JsonCanvasGroupNode): GroupNode {
	return {
		type: "group",
		id: node.id,
		value: node.label ?? "",
		geometry: geometryFromNode(node),
		color: node.color,
		background: node.background,
		backgroundStyle: node.backgroundStyle,
		children: [],
	};
}

export function fromNode(node: JsonCanvasNode): CanvasNode {
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

export function fromEdge(edge: JsonCanvasEdge): Edge {
	return {
		type: "edge",
		id: edge.id,
		value: edge.label ?? "",
		from: { node: edge.fromNode, side: edge.fromSide },
		to: { node: edge.toNode, side: edge.toSide },
		direction: edgeDirection(edge),
		color: edge.color,
	};
}
