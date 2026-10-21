const http = require("http");
const reqhandler = require("./req-handler");

const server = http.createServer(reqhandler);

server.listen(3000, () => {
  console.log("Calcaulator app started. Server is listning at port 3000");
});
