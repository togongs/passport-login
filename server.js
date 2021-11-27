const app = require("./app");
const Http = require("http");
const server = Http.createServer(app);
const port = process.env.PORT;

server.listen(port, () => {
  console.log(`server listen at http://localhost:${port}`);
});
