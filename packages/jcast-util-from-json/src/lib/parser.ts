import type { GroupNode, Root } from "@moritzrs/jcast";
import { jsonCanvas } from "@moritzrs/jsoncanvas";
import { fromEdge, fromNode } from "./nodes.js";
import { isInsideNode } from "./util.js";

/**
 * Parse a JSON string into a JCAST tree.
 * @param source The JSON string to parse.
 */
export function parse(source: string) {
	const canvas = jsonCanvas(source);

	const tree: Root = {
		type: "root",
		children: canvas.edges.map(fromEdge),
	};

	const groups: GroupNode[] = [];
	for (const node of canvas.nodes) {
		const parsed = fromNode(node);

		const parent = groups.filter((g) => isInsideNode(parsed, g)).at(-1) ?? tree;
		parent.children.push(parsed);

		if (parsed.type === "group") groups.push(parsed);
	}

	return tree;
}
