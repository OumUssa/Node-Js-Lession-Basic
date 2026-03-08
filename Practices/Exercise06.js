const http = require("http");

const data = [
  {
    flag: "Home",
  },
];
const server = http.createServer((req, res) => {
  let url = req.url;

  if (url === "/" || url === "/home") {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data, null, 2));
  } else {
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 404;
    res.end("<h1>404 - Page Not Found</h1>");
  }
});

server.listen(3000, () => {
  console.log("server run successfully on port 3000");
});
