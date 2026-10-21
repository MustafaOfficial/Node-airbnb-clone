const http = require("http");
const logical_error = require("./logical_error");
// const requestListner = require("./user");

const server = http.createServer((req, res) => {
  logical_error();
  console.log(req.headers);
  res.end();
  return;
});

const port = 3001;

server.listen(port, () => {
  console.log(`Server is listning at ddddd port ${port}`);
});
