const path = require("path");
const express = require("express");
const rootDIr = require("../utils/rootDir");

const contactRouter = express.Router();

contactRouter.get("/", (req, res, next) => {
  console.log("Handling '/'");
  res.sendFile(path.join(rootDIr, "views", "contact-us.html"));
});

contactRouter.get("/contact-us", (req, res, next) => {
  console.log("Handling '/contact-us", req.url, req.method);
  res.sendFile(path.join(rootDIr, "views", "contact-us-form.html"));
});

contactRouter.post("/contact-us", (req, res, next) => {
  console.log(req.body);
  res.sendFile(path.join(rootDIr, "views", "contact-succes.html"));
});

module.exports = contactRouter;
