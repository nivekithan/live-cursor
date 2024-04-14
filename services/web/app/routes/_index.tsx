import { json, type MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { OtherCursors } from "~/components/otherCursors";

export const meta: MetaFunction = () => {
  return [
    { title: "Live Cursor" },
    {
      name: "description",
      content: "Live Cursor with Partykit",
    },
  ];
};

export async function clientLoader() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  return json({ windowWidth, windowHeight });
}

clientLoader.hydrate = true;

export default function Index() {
  const { windowHeight, windowWidth } = useLoaderData<typeof clientLoader>();
  return (
    <div>
      <div className="min-h-screen grid place-items-center">
        <h1 className="text-[5rem] font-bold relative -top-6">
          Live Cursor Demo
        </h1>
      </div>
      <OtherCursors windowWidth={windowWidth} windowHeight={windowHeight} />
    </div>
  );
}
