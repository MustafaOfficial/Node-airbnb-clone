const express = require("express");

const app = express();

app.use((req, resizeBy, next) => {
  console.log("Inside First Dummy MiddleWare", req.url, req.method);
  next();
});

app.use((req, res, next) => {
  console.log("Inside Second Dummy middleware", req.url, req.method);
  next();
});
//===== These dummy middlewares will pass the execution to the subsequent handlers beacause they are not sending any response =========

//========= Thirst Middlware commented out to pass execution to the ssubsequest handlers ============
// app.use((req, res, next) => {
//   console.log("Inside Third Dummy middleware", req.url, req.method);
//   res.send("<h1>This is response from third dummy Middleware</h1>");
//   next();
// });

app.get("/", (req, res, next) => {
  console.log("Handling '/'");
  res.send("<h3>Handling '/'</h3>" + '<a href="/contact-us">Contact US</a>');
  // next();    //no need for next here
});

app.get("/contact-us", (req, res, next) => {
  console.log("Handling '/contact-us", req.url, req.method);
  res.send(
    "<h3>This is a test response from server with express- Inside Contact-us page</h3>" +
      '<form action=\"/contact-us\" method=\"POST\">' +
      '<input type="text" name="Username" id="Username" placeholder="Username"><br>' +
      '<input type="email" name="email" id="email" placeholder="email"><br>' +
      '<input type="submit" value="SUBMIT">' +
      "</form>",
  );
  // next();   //no need
});

app.post("/contact-us", (req, res, next) => {
  console.log("Handling '/contact-us", req.url, req.method);
  res.send("<h3>Message Recieved</h3>");
});

app.listen(3000, () => {
  console.log("Listning on port 3000");
});
