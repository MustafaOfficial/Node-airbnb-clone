//core modules
const path = require("path");

// external modules
const express = require("express");

//local modules
const rootPath = require("../utils/rootPathUtil");
const { title } = require("process");
const homeController = require("../controllers/hostController");

const hostRouter = express.Router();

hostRouter.get("/add-home", homeController.getAddHome);
hostRouter.get("/host-home-list", homeController.getHostHomeList);

hostRouter.post("/add-home", homeController.postAddHome);

exports.hostRouter = hostRouter;
