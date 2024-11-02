import type { Root } from "@moritzrs/jcast";
import type { JSONCanvas } from "@moritzrs/jsoncanvas";
import { visit } from "unist-util-visit";
import { fromEdge, fromNode } from "./nodes.js";

/**
 * Serialize a JCAST tree into a JSONCanvas.
 * @param tree The JCAST tree to serialize.
 */
export function serialize(tree: Root): JSONCanvas {
	const canvas: JSONCanvas = {
		nodes: [],
		edges: [],
	};

	visit(tree, (node) => {
		if (node.type === "root") return;

		if (node.type === "edge") canvas.edges.push(fromEdge(node));
		else canvas.nodes.push(fromNode(node));
	});

	return canvas;
}
