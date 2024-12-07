import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { extname, join } from "https://deno.land/std@0.203.0/path/mod.ts";

const rootPath = Deno.cwd();

serve(
  async (request) => {
    const url = new URL(request.url);
    let filePath = join(rootPath, url.pathname); // Default: Map request to the filesystem

    try {
      // Serve the index.html for root or main entry requests
      if (
        url.pathname === "/" ||
        url.pathname === "/seedy_place_in_outer_space/"
      ) {
        filePath = join(rootPath, "dist", "index.html");
      }

      // Serve the Service Worker explicitly
      if (url.pathname === "/seedy_place_in_outer_space/serviceWorker.js") {
        filePath = join(rootPath, "dist", "serviceWorker.js");
      }

      // Serve static assets like JSON, images, icons
      if (url.pathname.startsWith("/seedy_place_in_outer_space/assets/")) {
        filePath = join(
          rootPath,
          "dist",
          url.pathname.replace("/seedy_place_in_outer_space", ""),
        );
      }

      // Read and return the requested file
      const file = await Deno.readFile(filePath);
      const ext = extname(filePath);

      // Match MIME types with file extensions
      const mimeTypes = {
        ".html": "text/html",
        ".js": "application/javascript",
        ".json": "application/json",
        ".png": "image/png",
        ".ico": "image/x-icon",
        ".jpg": "image/jpeg",
        ".css": "text/css",
      };

      return new Response(file, {
        status: 200,
        headers: {
          "content-type": mimeTypes[ext] || "application/octet-stream",
        },
      });
    } catch {
      // Send a 404 if the file is not found
      return new Response("404: File Not Found", { status: 404 });
    }
  },
  { port: 8080 },
);

console.log("Server is running at http://localhost:8080/");
