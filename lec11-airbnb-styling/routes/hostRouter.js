//core modules
const path = require("path");

// external modules
const express = require("express");

//local modules
const rootPath = require("../utils/rootPathUtil");

const hostRouter = express.Router();

hostRouter.get("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootPath, "views", "addHome.html"));
});

hostRouter.post("/add-home", (req, res, next) => {
  res.send(
    `<h2>Home Registred Successfully</h2><br><p>Home name is: ${req.body.home}</p><a href="/host/add-home">ADD HOME</a>`,
  );
});

module.exports = hostRouter;
