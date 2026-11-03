//core modules
const path = require("path");

// external modules
const express = require("express");

//local modules
const rootPath = require("../utils/rootPathUtil");
const { title } = require("process");
const hostController = require("../controllers/hostController");

const hostRouter = express.Router();

hostRouter.get("/add-home", hostController.getAddHome);
hostRouter.get("/host-home-list", hostController.getHostHomeList);

hostRouter.post("/add-home", hostController.postAddHome);
hostRouter.get("/edit-home/:homeId", hostController.getEditHome);
hostRouter.post("/edit-home", hostController.postEditHome);

exports.hostRouter = hostRouter;
