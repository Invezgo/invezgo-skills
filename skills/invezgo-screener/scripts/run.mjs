import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const sharedClient = path.resolve(currentDir, "../../_shared/scripts/invezgo-api.mjs");
const args = process.argv.slice(2);
const forwardedArgs =
  args.length === 0 || (args[0] === "--list-tools" && args.length === 1)
    ? ["--list-tools", "screener"]
    : args;

const result = spawnSync(process.execPath, [sharedClient, ...forwardedArgs], {
  stdio: "inherit",
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 0);
