const http = require("http");
const requestListner = require("./user");

const server = http.createServer(requestListner);

const port = 3000;

server.listen(port, () => {
  console.log(`Server is listning at port ${port}`);
});
