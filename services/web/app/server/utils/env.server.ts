import { AppLoadContext } from "@remix-run/cloudflare";
import { z } from "zod";

const EnvVariablesSchema = z.object({
  PARTYKIT_HOST: z.string(),
});

export function getEnv(ctx: AppLoadContext) {
  return EnvVariablesSchema.parse(ctx.cloudflare.env);
}

export function getClientEnv(env: ReturnType<typeof getEnv>) {
  return {
    PARTYKIT_HOST: env.PARTYKIT_HOST,
  };
}
