import db from "../db/database.js";

class Thread {
  static getAll() {
    return db.prepare("SELECT * FROM threads ORDER BY updated_at DESC").all();
  }

  static getById(id) {
    return db.prepare("SELECT * FROM threads WHERE id = ?").get(id);
  }

  static create({ title, content, category }) {
    const stmt = db.prepare(
      "INSERT INTO threads (title, content, category) VALUES (?, ?, ?)"
    );
    const result = stmt.run(title, content, category);
    return result.lastInsertRowid;
  }

  static delete(id) {
    // First delete all replies for this thread
    db.prepare("DELETE FROM replies WHERE thread_id = ?").run(id);
    // Then delete the thread itself
    return db.prepare("DELETE FROM threads WHERE id = ?").run(id);
  }

  static getReplies(threadId) {
    return db
      .prepare("SELECT * FROM replies WHERE thread_id = ? ORDER BY created_at")
      .all(threadId);
  }
}

export default Thread;
