import { routes, type Redirect, VercelConfig } from "@vercel/config/v1";
import { Rewrite } from "@vercel/config/v1/types";
import { readdirSync, existsSync } from "node:fs";
import path from "node:path";

const SKIP = new Set(["scripts", "dist", "node_modules"]);

const talks = readdirSync(".", { withFileTypes: true })
  .filter(
    (e) => e.isDirectory() && !e.name.startsWith(".") && !SKIP.has(e.name),
  )
  .filter((e) => existsSync(path.join(e.name, "slides.md")));

const talkNames = talks.map((t) => t.name).join("|");
const catchAllSource =
  talkNames.length > 0 ? `/((?!${talkNames}(?:/|$)).*)` : "/(.*)";

export const config: VercelConfig = {
  buildCommand: "pnpm build",
  installCommand:
    'env "pnpm_config_//git.netways.de/api/v4/projects/2053/packages/npm/:_authToken=$NWS_GITLAB_TOKEN" pnpm install',
  outputDirectory: "dist",
  rewrites: talks.map(
    (t) =>
      routes.rewrite(`/${t.name}(/.*)?`, `/${t.name}/index.html`) as Rewrite,
  ),
  redirects: [
    routes.redirect(catchAllSource, "https://dbodky.me/speaking", {
      statusCode: 301,
    }) as Redirect,
  ],
};
