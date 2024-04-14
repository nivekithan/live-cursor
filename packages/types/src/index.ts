import { z } from "zod";

export const CursorIdSchema = z.string();
export type CursorId = z.infer<typeof CursorIdSchema>;

export const PostionSchema = z.object({ x: z.number(), y: z.number() });

export type Postion = z.infer<typeof PostionSchema>;

export const CursorSchema = z
  .object({ id: CursorIdSchema })
  .merge(PostionSchema);
export type Cursor = z.infer<typeof CursorSchema>;

export const SocketOutMessageSchema = PostionSchema;
export type SocketOutMessage = z.infer<typeof SocketOutMessageSchema>;

export const SyncCursorSchema = z.object({
  cursors: z.record(CursorIdSchema, PostionSchema),
  type: z.literal("sync"),
});
export type SyncCursor = z.infer<typeof SyncCursorSchema>;

export const UpdateCursorSchema = CursorSchema.merge(
  z.object({
    type: z.literal("update"),
  })
);
export type UpdateCursor = z.infer<typeof UpdateCursorSchema>;

export const RemoveCursorSchema = z.object({
  id: CursorIdSchema,
  type: z.literal("remove"),
});

export const SocketInMessageSchema = z.discriminatedUnion("type", [
  UpdateCursorSchema,
  RemoveCursorSchema,
  SyncCursorSchema,
]);

export type SocketInMessage = z.infer<typeof SocketInMessageSchema>;
