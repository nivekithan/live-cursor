import usePartySocket from "partysocket/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  CursorId,
  Postion,
  SocketInMessageSchema,
  SocketOutMessage,
} from "types";
import { PARTKIT_ROOM_ID } from "./utils/constants";

export type CursorContext = {
  cursors: Record<CursorId, Postion>;
};

const CursorContext = createContext<CursorContext>({ cursors: {} });

export function useCursor() {
  return useContext(CursorContext);
}

export function CursorContextProvider({
  host,
  children,
}: {
  host: string;
  children: React.ReactNode;
}) {
  const [cursors, setCursors] = useState<Record<CursorId, Postion>>({});
  const ws = usePartySocket({
    host: host,
    room: PARTKIT_ROOM_ID,
    onOpen() {
      console.log("PartySocket connected");
    },
    onMessage(message) {
      console.log("onMessage");
      const data = SocketInMessageSchema.parse(JSON.parse(message.data));

      if (data.type === "update") {
        setCursors((prev) => {
          return {
            ...prev,
            [data.id]: { x: data.x, y: data.y },
          };
        });
      } else if (data.type === "remove") {
        setCursors((prev) => {
          const { [data.id]: _, ...rest } = prev;
          return rest;
        });
      } else if (data.type === "sync") {
        setCursors(data.cursors);
      }
    },
  });

  useEffect(() => {
    console.log("CursorContextProvider useEffect");

    const mouseMoveListener = (e: MouseEvent) => {
      const position: Postion = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };

      ws.send(JSON.stringify(position satisfies SocketOutMessage));
    };

    window.addEventListener("mousemove", mouseMoveListener);

    return () => {
      window.removeEventListener("mousemove", mouseMoveListener);
    };
  }, [ws]);

  return (
    <CursorContext.Provider value={{ cursors: cursors }}>
      {children}
    </CursorContext.Provider>
  );
}
