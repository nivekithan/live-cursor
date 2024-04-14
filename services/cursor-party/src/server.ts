import type * as Party from "partykit/server";
import {
  PostionSchema,
  SocketOutMessageSchema,
  type CursorId,
  type Postion,
  type SocketInMessage,
} from "types";

export default class Server implements Party.Server {
  constructor(readonly room: Party.Room) { }

  onMessage(message: string, sender: Party.Connection) {
    const position = SocketOutMessageSchema.parse(JSON.parse(message));

    this.room.storage.put(sender.id, position, { allowUnconfirmed: true });
    this.room.broadcast(
      JSON.stringify({
        ...position,
        id: sender.id,
        type: "update",
      } satisfies SocketInMessage),
      [sender.id]
    );
  }

  async onConnect(conn: Party.Connection) {
    const cursorsMap = await this.room.storage.list();

    const cursors: Record<CursorId, Postion> = {};

    for (const [id, position] of cursorsMap) {
      cursors[id] = PostionSchema.parse(position);
    }

    conn.send(
      JSON.stringify({
        type: "sync",
        cursors: cursors,
      } satisfies SocketInMessage)
    );
  }

  onClose(conn: Party.Connection) {
    this.room.broadcast(
      JSON.stringify({
        id: conn.id,
        type: "remove",
      } satisfies SocketInMessage),
      [conn.id]
    );

    this.room.storage.delete(conn.id);
  }
}

Server satisfies Party.Worker;
