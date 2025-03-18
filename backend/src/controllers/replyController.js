import Reply from "../models/Reply.js";
import db from "../db/database.js";

export const createReply = (req, res) => {
  try {
    const { content } = req.body;
    const threadId = req.params.threadId;

    console.log("Creating reply:", { threadId, content });

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    if (!threadId) {
      return res.status(400).json({ error: "Thread ID is required" });
    }

    // Verify thread exists and log current threads
    console.log("Checking threads in database...");
    const threads = db.prepare("SELECT id FROM threads").all();
    console.log(
      "Available thread IDs:",
      threads.map((t) => t.id)
    );

    const thread = db
      .prepare("SELECT id FROM threads WHERE id = ?")
      .get(threadId);
    console.log("Found thread:", thread);

    if (!thread) {
      return res.status(404).json({
        error: "Thread not found",
        threadId,
        availableThreads: threads.map((t) => t.id),
      });
    }

    // Double check the thread ID type
    const numericThreadId = Number(threadId);
    if (isNaN(numericThreadId)) {
      return res.status(400).json({ error: "Invalid thread ID format" });
    }

    console.log("Creating reply with numeric thread ID:", numericThreadId);
    const reply = Reply.create({ threadId: numericThreadId, content });
    console.log("Reply created:", reply);

    if (!reply) {
      throw new Error(
        "Failed to create reply - no reply returned from database"
      );
    }

    res.setHeader("Content-Type", "application/json");
    res.status(201).json(reply);
  } catch (error) {
    console.error("Error creating reply:", error);
    res.status(500).json({
      error: "Failed to create reply",
      details: error.message,
      threadId: req.params.threadId,
      content: req.body.content,
    });
  }
};

export const deleteReply = (req, res) => {
  try {
    const result = Reply.delete(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: "Reply not found" });
    }
    res.json({ message: "Reply deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete reply" });
  }
};
