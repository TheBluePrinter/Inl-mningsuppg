import Database from "better-sqlite3";
import { join } from "path";

// Connect to your external database process.cwd() is used toto locate the SQLite database file
const db = new Database(join(process.cwd(), "src/db/forum.db"), {
  verbose: console.log,
});

// Enable foreign key support didnt work anyways..
db.pragma("foreign_keys = ON");

// Verify foreign keys are enabled
const foreignKeysEnabled = db.pragma("foreign_keys", { simple: true });
console.log("Foreign keys enabled:", foreignKeysEnabled);

export default db;
