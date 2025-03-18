import express from "express";
import { join } from "path";
import threadRoutes from "./routes/threadRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Serve static files from the React build
app.use(express.static(join(process.cwd(), "../frontend/dist")));

// API Routes
app.use("/api/threads", threadRoutes);

// Serve React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(join(process.cwd(), "../frontend/dist/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
