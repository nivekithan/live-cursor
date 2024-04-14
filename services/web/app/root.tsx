import { LinksFunction, LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { getClientEnv, getEnv } from "./server/utils/env.server";
import { CursorContextProvider } from "./lib/cursor";
import tailwindUrl from "~/tailwind.css?url";

export function links(): ReturnType<LinksFunction> {
  return [{ rel: "stylesheet", href: tailwindUrl }];
}

export async function loader({ context }: LoaderFunctionArgs) {
  const env = getEnv(context);

  return json({ env: getClientEnv(env) });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const {
    env: { PARTYKIT_HOST },
  } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <CursorContextProvider host={PARTYKIT_HOST}>
          {children}
        </CursorContextProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
