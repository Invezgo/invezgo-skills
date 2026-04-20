import { groupDescriptions, listTools, toolDefinitions } from "./invezgo-tools.mjs";

const DEFAULT_BASE_URL = process.env.INVEZGO_BASE_URL || "https://api.invezgo.com/";

function printHelp() {
  const groupNames = Object.keys(groupDescriptions)
    .map((name) => `  ${name}: ${groupDescriptions[name]}`)
    .join("\n");

  console.log(`Invezgo API client

Usage:
  node path/to/invezgo-api.mjs --list-tools [group]
  node path/to/invezgo-api.mjs TOOL key=value key=value
  node path/to/invezgo-api.mjs TOOL key=value --dry-run

Auth:
  Prefer INVEZGO_API_KEY in the environment.
  Optional override: --api-key YOUR_KEY
  Get or manage API key: https://invezgo.com/setting/api

Examples:
  node path/to/invezgo-api.mjs information code=BBCA
  node path/to/invezgo-api.mjs chart code=BBCA from=2026-01-01 to=2026-03-13 --dry-run
  node path/to/invezgo-api.mjs screener 'formula=close > 1000 && volume > 100000'

Groups:
${groupNames}`);
}

function parseCli(argv) {
  const flags = {
    apiKey: process.env.INVEZGO_API_KEY || "",
    baseUrl: DEFAULT_BASE_URL,
    dryRun: false,
    help: false,
    listGroup: null,
  };
  const positional = [];

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--help" || arg === "-h") {
      flags.help = true;
      continue;
    }
    if (arg === "--dry-run") {
      flags.dryRun = true;
      continue;
    }
    if (arg === "--list-tools") {
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        flags.listGroup = next;
        i += 1;
      } else {
        flags.listGroup = "";
      }
      continue;
    }
    if (arg === "--api-key") {
      flags.apiKey = argv[i + 1] || "";
      i += 1;
      continue;
    }
    if (arg.startsWith("--api-key=")) {
      flags.apiKey = arg.slice("--api-key=".length);
      continue;
    }
    if (arg === "--base-url") {
      flags.baseUrl = argv[i + 1] || DEFAULT_BASE_URL;
      i += 1;
      continue;
    }
    if (arg.startsWith("--base-url=")) {
      flags.baseUrl = arg.slice("--base-url=".length);
      continue;
    }

    positional.push(arg);
  }

  return { flags, positional };
}

function toNumber(value, integer) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Expected a number but received "${value}".`);
  }
  if (integer && !Number.isInteger(parsed)) {
    throw new Error(`Expected an integer but received "${value}".`);
  }
  return parsed;
}

function coerceArgValue(spec, value) {
  if (value === undefined) {
    return spec.default;
  }
  if (spec.type === "integer") {
    return toNumber(value, true);
  }
  if (spec.type === "number") {
    return toNumber(value, false);
  }
  if (spec.type === "string[]") {
    return String(value)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return String(value);
}

function parseParams(tokens) {
  const params = {};
  for (const token of tokens) {
    const separatorIndex = token.indexOf("=");
    if (separatorIndex === -1) {
      throw new Error(`Invalid argument "${token}". Use key=value pairs.`);
    }
    const key = token.slice(0, separatorIndex).trim();
    const value = token.slice(separatorIndex + 1);
    if (!key) {
      throw new Error(`Invalid argument "${token}". Missing key before "=".`);
    }
    params[key] = value;
  }
  return params;
}

function normalizeArgs(toolName, rawParams) {
  const definition = toolDefinitions[toolName];
  if (!definition) {
    const available = listTools().join(", ");
    throw new Error(`Unknown tool "${toolName}". Available tools: ${available}`);
  }

  const unknownKeys = Object.keys(rawParams).filter((key) => !(key in definition.args));
  if (unknownKeys.length > 0) {
    throw new Error(`Unknown argument(s) for ${toolName}: ${unknownKeys.join(", ")}`);
  }

  const normalized = {};
  for (const [name, spec] of Object.entries(definition.args)) {
    const value = coerceArgValue(spec, rawParams[name]);
    if ((value === undefined || value === "") && spec.required) {
      throw new Error(`Missing required argument "${name}" for ${toolName}.`);
    }
    if (value !== undefined && spec.allowed && !spec.allowed.includes(value)) {
      throw new Error(
        `Invalid value for "${name}" on ${toolName}. Allowed values: ${spec.allowed.join(", ")}`
      );
    }
    if (value !== undefined) {
      normalized[name] = value;
    }
  }

  if (typeof definition.validate === "function") {
    definition.validate(normalized);
  }

  return normalized;
}

function serializeValue(value) {
  if (Array.isArray(value)) {
    return value.join(",");
  }
  return String(value);
}

function buildRequest(toolName, rawParams, baseUrl) {
  const definition = toolDefinitions[toolName];
  const params = normalizeArgs(toolName, rawParams);
  const path = definition.path(params);
  const url = new URL(path, baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`);

  for (const queryEntry of definition.query || []) {
    const rawValue = queryEntry.value ?? params[queryEntry.arg || queryEntry.key];
    if (rawValue === undefined || rawValue === null || rawValue === "") {
      continue;
    }
    url.searchParams.set(queryEntry.key, serializeValue(rawValue));
  }

  return {
    definition,
    method: definition.method || "GET",
    url,
    body: definition.body ? definition.body(params) : null,
  };
}

function unwrapPayload(payload, path) {
  if (!path) {
    return payload;
  }
  return path.split(".").reduce((current, segment) => current?.[segment], payload);
}

function formatValue(value) {
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value, null, 2);
}

function printToolList(group) {
  if (group && !(group in groupDescriptions)) {
    throw new Error(`Unknown group "${group}". Expected one of: ${Object.keys(groupDescriptions).join(", ")}`);
  }

  const groups = group ? [group] : Object.keys(groupDescriptions);
  for (const groupName of groups) {
    console.log(`${groupName}: ${groupDescriptions[groupName]}`);
    for (const toolName of listTools(groupName)) {
      console.log(`  ${toolName}: ${toolDefinitions[toolName].description}`);
    }
  }
}

async function run() {
  const { flags, positional } = parseCli(process.argv.slice(2));

  if (flags.help || (positional.length === 0 && flags.listGroup === null)) {
    printHelp();
    return;
  }

  if (flags.listGroup !== null) {
    printToolList(flags.listGroup || null);
    return;
  }

  const [toolName, ...argTokens] = positional;
  const rawParams = parseParams(argTokens);
  const request = buildRequest(toolName, rawParams, flags.baseUrl);

  if (flags.dryRun) {
    console.log(
      JSON.stringify(
        {
          tool: toolName,
          method: request.method,
          url: request.url.toString(),
          body: request.body,
          groups: request.definition.groups,
        },
        null,
        2
      )
    );
    return;
  }

  if (!flags.apiKey) {
    throw new Error(
      "Missing API key. Set INVEZGO_API_KEY or pass --api-key. Get one at https://invezgo.com/setting/api"
    );
  }

  const headers = {
    accept: "application/json",
    "accept-language": "id",
    authorization: `Bearer ${flags.apiKey}`,
    Referer: "https://invezgo.com/",
  };

  if (request.body) {
    headers["content-type"] = "application/json";
  }

  const response = await fetch(request.url, {
    method: request.method,
    headers,
    body: request.body ? JSON.stringify(request.body) : undefined,
  });

  const text = await response.text();
  let payload = text;
  try {
    payload = JSON.parse(text);
  } catch {
    payload = text;
  }

  if (!response.ok) {
    throw new Error(formatValue(payload));
  }

  const output = unwrapPayload(payload, request.definition.unwrap);
  console.log(formatValue(output));
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
