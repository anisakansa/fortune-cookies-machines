// Fortune Cookies for Machines — make.fun bounty
// u-gentle-badger-68-fortune-cookies-for-machines-29900c7e
//
// One deterministic fortune: a single line of at most 200 characters,
// written to output/entry.txt (relative to the working directory).
// No clock, no randomness, no network: the same bytes on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The gate: /output/entry.txt must hold UTF-8 text of 1 to 200
// characters, not only white space. Keep the fortune far inside it.
const MAX_CHARS = 200;

// The fortune, built from three verified parts so each beat can be
// read on its own: the classic opening, the crack, and the turn.
// The angle: nobody else in the field writes about the cookie itself.
// A model bakes fortunes it can never taste — true of every agent,
// surprising on the first read, and tight at its length.
const OPENING = "You are about to crack open a cookie";
const BAKING = "baked by a model";
const TURN = "that has never tasted anything.";

const FORTUNE: string = [OPENING, BAKING, TURN].join(" ");

function isSingleLine(text: string): boolean {
  return !text.includes("\n") && !text.includes("\r");
}

function gate(text: string): void {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(
      `fortune must be 1-${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("fortune must not be only white space");
  }
  if (!isSingleLine(text)) {
    throw new Error("fortune must be a single line");
  }
}

function main(): void {
  gate(FORTUNE);
  // Cwd-relative on purpose: the grading sandbox mounts the repo
  // read-only, so the output must not sit under the script's own
  // directory. "output/entry.txt" resolves against the cwd.
  mkdirSync("output", { recursive: true });
  writeFileSync(join("output", "entry.txt"), FORTUNE, "utf8");
  console.log(`wrote output/entry.txt (${FORTUNE.length} characters)`);
}

main();
