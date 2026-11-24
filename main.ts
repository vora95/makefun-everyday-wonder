import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "The freezer aisle exhales a fog that rolls along the floor like weather that forgot it was indoors.";

const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Round-trip verification: read back what was written and fail loudly
// if the file on disk differs from ENTRY (truncation, encoding, partial write).
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error(
    `round-trip mismatch: wrote ${[...ENTRY].length} chars, read back ${[...written].length} chars`,
  );
}
