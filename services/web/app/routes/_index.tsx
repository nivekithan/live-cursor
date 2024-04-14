import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import usePartySocket from "partysocket/react";
import { PARTKIT_ROOM_ID } from "~/lib/utils/constants";
import { getClientEnv, getEnv } from "~/server/utils/env.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ];
};
export async function loader({ context }: LoaderFunctionArgs) {
  const env = getEnv(context);

  return json({ env: getClientEnv(env) });
}

export default function Index() {
  const { env } = useLoaderData<typeof loader>();
  const ws = usePartySocket({
    host: env.PARTYKIT_HOST,
    room: PARTKIT_ROOM_ID,
    onOpen() {
      console.log("PartySocket connected");
    },
  });
  return <div>Hey there</div>;
}
