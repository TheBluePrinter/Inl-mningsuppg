import Thread from "../models/Thread.js";

export const getAllThreads = (req, res) => {
  try {
    const threads = Thread.getAll();
    res.json(threads);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch threads" });
  }
};

export const getThread = (req, res) => {
  try {
    const thread = Thread.getById(req.params.id);
    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    const replies = Thread.getReplies(req.params.id);
    res.json({ ...thread, replies });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch thread" });
  }
};

export const createThread = (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    const id = Thread.create({ title, content, category });
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: "Failed to create thread" });
  }
};

export const deleteThread = (req, res) => {
  try {
    const result = Thread.delete(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.json({ message: "Thread deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete thread" });
  }
};
