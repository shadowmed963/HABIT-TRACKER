import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { handleDemo } from "./routes/demo";
import { handleCreateUser } from "./routes/create-user";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // User creation endpoint (uses service role key to bypass RLS)
  app.post("/api/users/create-profile", handleCreateUser);

  // Serve static files from dist/spa (production build)
  const spaDir = path.join(__dirname, "..", "dist", "spa");
  app.use(express.static(spaDir, { maxAge: "1h" }));

  // SPA fallback: serve index.html for non-API routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(spaDir, "index.html"), {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
  });

  return app;
}
