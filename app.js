const http = require("http"); // Import HTTP module
const fs = require("fs"); // Import File System module
const path = require("path"); // Import Path module

// Define the path to the HTML file
const htmlPath = path.join(__dirname, "templates", "page.html");

// Create the HTTP server
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // Serve the HTML file
    fs.readFile(htmlPath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("500 Internal Server Error");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else {
    // Serve static files (like the image)
    const filePath = path.join(__dirname, "templates", req.url);
    fs.readFile(filePath, (err, fileContent) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
        return;
      }

      // Set the proper content type for images
      const ext = path.extname(filePath);
      const contentType = ext === ".png" ? "image/png" : "text/plain";

      res.writeHead(200, { "Content-Type": contentType });
      res.end(fileContent);
    });
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
