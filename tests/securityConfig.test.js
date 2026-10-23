import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("Vercel deploys an enforcing CSP with a restrictive baseline", async () => {
  const config = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
  const policy = config.headers
    .flatMap((entry) => entry.headers)
    .find((header) => header.key.toLowerCase() === "content-security-policy");

  assert.ok(policy, "an enforced Content-Security-Policy header must be configured");
  assert.match(policy.value, /default-src 'self'/);
  assert.match(policy.value, /object-src 'none'/);
  assert.match(policy.value, /base-uri 'self'/);
  assert.doesNotMatch(policy.key, /report-only/i);

  for (const directive of ["script-src", "frame-src", "connect-src"]) {
    const sources = policy.value.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${directive} `));
    assert.match(sources, /https:\/\/challenges\.cloudflare\.com/, `${directive} must allow Cloudflare Turnstile`);
  }
});
