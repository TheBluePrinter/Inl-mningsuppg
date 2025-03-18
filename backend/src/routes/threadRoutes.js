import express from "express";
import {
  getAllThreads,
  getThread,
  createThread,
  deleteThread,
} from "../controllers/threadController.js";
import { createReply, deleteReply } from "../controllers/replyController.js";

const router = express.Router();

// Thread routes
router.get("/", getAllThreads);
router.get("/:id", getThread);
router.post("/", createThread);

router.delete("/:id", deleteThread);

// Reply routes
router.post("/:threadId/replies", createReply);
router.delete("/replies/:id", deleteReply);

export default router;
