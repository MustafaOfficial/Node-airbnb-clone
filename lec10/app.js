//core modules
const http = require("http");
const bodyParser = require("body-parser");

//external modules
const express = require("express");

//local modules
const requestListner = require("./user");

const app = express();

app.get("/", (req, res, next) => {
  console.log("Inside First Middleware ");
  res.send("<h1>Inside First Middle ware</h1>");
  next();
});

app.get("/submit-details", (req, res, next) => {
  console.log("Inside Second Middleware ");
  // next();
  res.send(
    "<h3>This is a test response from server with express- Inside submit-details page</h3>" +
      '<form action=\"/submit-details\" method=\"POST\">' +
      '<input type="text" name="username" id="Username" placeholder="Username"><br>' +
      '<label for="male">Male</label>' +
      '<input type="radio" id="male" name="gender" value="male">' +
      '<label for="female">Female</label>' +
      '<input type="radio" id="female" name="gender" value="female">' +
      "<br>" +
      '<input type="submit" value="SUBMIT">' +
      "</form>",
  );
});

app.use(bodyParser.urlencoded());

app.post("/submit-details", (req, res, next) => {
  console.log("Inside Second Middleware ");
  // next();
  console.log(req.body);
  res.send(
    `<h3>Details Submited (Post req Handled)</h3><br><h3>Recieved Data : ${req.body.username} and ${req.body.gender}</h3>`,
  );
});

//Middleware to send default response
app.use("/", (req, res, next) => {
  console.log("Default response");
  res.send("<h1>Default response</h1>");
});
// const server = http.createServer(app);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is listning at port ${port}`);
});
