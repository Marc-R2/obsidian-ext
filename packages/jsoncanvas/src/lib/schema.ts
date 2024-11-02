import { z } from "zod";
import type {
	Color,
	Edge,
	Side,
	EdgeEnd,
	FileNode,
	GroupNode,
	JSONCanvas,
	LinkNode,
	Node,
	TextNode,
} from "./types.js";

const ColorSchema: z.ZodType<Color> = z.union([
	z.string().regex(/^#[0-9a-fA-F]{6}$/),
	z.literal("1"),
	z.literal("2"),
	z.literal("3"),
	z.literal("4"),
	z.literal("5"),
	z.literal("6"),
]) as z.ZodType<Color>;

const SideSchema: z.ZodType<Side> = z.enum(["top", "right", "bottom", "left"]);

const EdgeEndSchema: z.ZodType<EdgeEnd> = z.enum(["none", "arrow"]);

const EdgeSchema: z.ZodType<Edge> = z.strictObject({
	id: z.string(),
	fromNode: z.string(),
	fromSide: SideSchema.optional(),
	fromEnd: EdgeEndSchema.default("none") as z.ZodType<EdgeEnd>,
	toNode: z.string(),
	toSide: SideSchema.optional(),
	toEnd: EdgeEndSchema.default("arrow") as z.ZodType<EdgeEnd>,
	color: ColorSchema.optional(),
	label: z.string().optional(),
});

const CanvasNodeSchema = z.strictObject({
	id: z.string(),
	type: z.string(),
	x: z.number(),
	y: z.number(),
	width: z.number(),
	height: z.number(),
	color: ColorSchema.optional(),
});

const TextNodeSchema: z.ZodType<TextNode> = CanvasNodeSchema.merge(
	z.strictObject({
		type: z.literal("text"),
		text: z.string(),
	}),
);

const FileNodeSchema: z.ZodType<FileNode> = CanvasNodeSchema.merge(
	z.strictObject({
		type: z.literal("file"),
		file: z.string(),
		subpath: z.string().regex(/^#/).optional() as z.ZodType<`#${string}`>,
	}),
);

const LinkNodeSchema: z.ZodType<LinkNode> = CanvasNodeSchema.merge(
	z.strictObject({
		type: z.literal("link"),
		url: z.string(),
	}),
);

const GroupNodeSchema: z.ZodType<GroupNode> = CanvasNodeSchema.merge(
	z.strictObject({
		type: z.literal("group"),
		label: z.optional(z.string()),
		background: z.optional(z.string()),
		backgroundStyle: z.optional(z.enum(["cover", "ratio", "repeat"])),
	}),
);

const NodeSchema: z.ZodType<Node> = z.union([
	TextNodeSchema,
	FileNodeSchema,
	LinkNodeSchema,
	GroupNodeSchema,
]);

const JSONCanvasSchema: z.ZodType<JSONCanvas> = z.strictObject({
	nodes: z.array(NodeSchema).default([]) as z.ZodType<Node[]>,
	edges: z.array(EdgeSchema).default([]) as z.ZodType<Edge[]>,
});

export function parse(input: string) {
	return JSONCanvasSchema.parse(JSON.parse(input));
}
