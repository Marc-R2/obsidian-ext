import type { Geometry, GroupNode } from "@moritzrs/jcast";

export function recalculateGroupGeometry(group: GroupNode): Geometry {
	if (!group.children.length) return group.geometry;
	const PADDING = 48; // TODO: make this configurable

	let x_min = Infinity;
	let y_min = Infinity;
	let x_max = -Infinity;
	let y_max = -Infinity;

	for (const child of group.children) {
		const childGeometry =
			child.type === "group" ? recalculateGroupGeometry(child) : child.geometry;

		x_min = Math.min(x_min, childGeometry.x);
		y_min = Math.min(y_min, childGeometry.y);

		const x_end = childGeometry.x + childGeometry.width;
		const y_end = childGeometry.y + childGeometry.height;
		x_max = Math.max(x_max, x_end);
		y_max = Math.max(y_max, y_end);
	}

	return {
		x: x_min - PADDING,
		y: y_min - PADDING,
		width: x_max - x_min + PADDING * 2,
		height: y_max - y_min + PADDING * 2,
	};
}
