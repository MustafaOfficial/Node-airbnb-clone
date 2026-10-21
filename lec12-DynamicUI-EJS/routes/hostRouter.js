//core modules
const path = require("path");

// external modules
const express = require("express");

//local modules
const rootPath = require("../utils/rootPathUtil");
const { title } = require("process");

const hostRouter = express.Router();

hostRouter.get("/add-home", (req, res, next) => {
  res.render("addHome", { title: "Add Home", currentPage: "addHome" });
});

const addedHomes = [];

hostRouter.post("/add-home", (req, res, next) => {
  res.render("homeAdded", {
    addedHome: req.body,
    title: "Home Added",
    currentPage: "homeAdded",
  });
  addedHomes.push(req.body);
  console.log(req.body);
  console.log(addedHomes);
});

exports.hostRouter = hostRouter;
exports.addedHomes = addedHomes;
