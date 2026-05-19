#!/usr/bin/env node
/**
 * Post-install script: builds @nxg-org/mineflayer-pathfinder (2026-rewrite)
 * and links it into node_modules/@nxg-org/.
 *
 * The 2026-rewrite branch ships TypeScript source only (no pre-built dist/).
 * Its postinstall (tsc) fails due to upstream type errors, so we install with
 * --ignore-scripts and build it here instead.
 */

import { execFileSync, execSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  symlinkSync,
  unlinkSync,
} from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(import.meta.url), "../../");
const PNPM_STORE = join(ROOT, "node_modules", ".pnpm");

// Find the pathfinder in the virtual store
const entries = readdirSync(PNPM_STORE).filter((e) =>
  e.startsWith("@nxg-org+mineflayer-pathfinder@"),
);

if (entries.length === 0) {
  console.log(
    "[build-pathfinder] Package not found in virtual store, skipping.",
  );
  process.exit(0);
}

const pkgDir = join(
  PNPM_STORE,
  entries[0],
  "node_modules",
  "@nxg-org",
  "mineflayer-pathfinder",
);
const distIndex = join(pkgDir, "dist", "index.js");

// Build if dist is missing
if (!existsSync(distIndex)) {
  console.log("[build-pathfinder] Building @nxg-org/mineflayer-pathfinder...");

  // Find tsc in the virtual store
  const tscEntries = readdirSync(PNPM_STORE).filter((e) =>
    e.startsWith("typescript@"),
  );
  if (tscEntries.length === 0) {
    console.error(
      "[build-pathfinder] TypeScript not found in virtual store, cannot build.",
    );
    process.exit(1);
  }
  const tsc = join(
    PNPM_STORE,
    tscEntries[0],
    "node_modules",
    "typescript",
    "bin",
    "tsc",
  );

  try {
    execFileSync(process.execPath, [tsc, "-p", join(pkgDir, "tsconfig.json")], {
      cwd: pkgDir,
      stdio: "inherit",
    });
  } catch {
    // tsc exits non-zero on type errors even when it emits — check if dist was created
    if (!existsSync(distIndex)) {
      console.error(
        "[build-pathfinder] Build failed and dist/index.js was not created.",
      );
      process.exit(1);
    }
  }
  console.log("[build-pathfinder] Build complete.");
} else {
  console.log("[build-pathfinder] dist/ already exists, skipping build.");
}

// Create symlink in node_modules/@nxg-org/mineflayer-pathfinder
const linkDir = join(ROOT, "node_modules", "@nxg-org");
const linkPath = join(linkDir, "mineflayer-pathfinder");

mkdirSync(linkDir, { recursive: true });

if (existsSync(linkPath)) {
  unlinkSync(linkPath);
}

symlinkSync(pkgDir, linkPath);
console.log("[build-pathfinder] Linked @nxg-org/mineflayer-pathfinder ✓");
