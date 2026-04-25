import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared", "index.html"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin(), spaFallbackPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve",
    configureServer(server) {
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}

function spaFallbackPlugin(): Plugin {
  return {
    name: "spa-fallback",
    apply: "serve",
    configureServer(server) {
      return () => {
        server.middlewares.use((req, res, next) => {
          // Skip if response already sent
          if (res.headersSent) return;
          
          // Skip API routes
          if (req.url.startsWith("/api/")) return next();
          
          // Skip if URL has a file extension (static assets)
          if (/\.\w+$/.test(req.url)) return next();
          
          // Skip non-GET requests
          if (req.method !== "GET") return next();
          
          // For all other GET requests without extensions, serve index.html
          const indexPath = path.resolve(__dirname, "index.html");
          const fs = require("fs");
          try {
            const content = fs.readFileSync(indexPath, "utf-8");
            res.setHeader("Content-Type", "text/html");
            res.end(content);
          } catch (e) {
            next();
          }
        });
      };
    },
  };
}
