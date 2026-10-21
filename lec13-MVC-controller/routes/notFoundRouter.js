const express = require("express");
const notFoundController = require("../controllers/notFoundController");
const notFoundRouter = express.Router();

notFoundRouter.use(notFoundController.notFound);

exports.notFoundRouter = notFoundRouter;
