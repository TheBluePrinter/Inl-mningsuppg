import db from "../db/database.js";

class Reply {
  static create({ threadId, content }) {
    // First verify the thread exists
    const thread = db
      .prepare("SELECT id FROM threads WHERE id = ?")
      .get(threadId);
    if (!thread) {
      throw new Error(`Thread with ID ${threadId} does not exist`);
    }

    try {
      const stmt = db.prepare(
        "INSERT INTO replies (thread_id, content) VALUES (?, ?)"
      );
      const result = stmt.run(threadId, content);

      // Update the thread's updated_at timestamp
      db.prepare(
        "UPDATE threads SET updated_at = CURRENT_TIMESTAMP WHERE id = ?"
      ).run(threadId);

      // Return the newly created reply
      return this.getById(result.lastInsertRowid);
    } catch (error) {
      console.error("Database error:", error);
      throw new Error(`Failed to create reply: ${error.message}`);
    }
  }

  static getById(id) {
    return db.prepare("SELECT * FROM replies WHERE id = ?").get(id);
  }

  static delete(id) {
    return db.prepare("DELETE FROM replies WHERE id = ?").run(id);
  }
}

export default Reply;
