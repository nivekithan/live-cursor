import { type MetaFunction } from "@remix-run/cloudflare";
import { useCursor } from "~/lib/cursor";

export const meta: MetaFunction = () => {
  return [
    { title: "Live Cursor" },
    {
      name: "description",
      content: "Live Cursor with Partykit",
    },
  ];
};

export default function Index() {
  const cursors = useCursor();
  return <pre>{JSON.stringify(cursors, null, 2)}</pre>;
}
