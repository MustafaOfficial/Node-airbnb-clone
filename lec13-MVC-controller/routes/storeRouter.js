const express = require("express");
const path = require("path");

const storeRouter = express.Router();
const rootPath = require("../utils/rootPathUtil");

// const { addedHomes } = require("../controllers/homeController");
// const hostController = require("../controllers/hostController");
const storeController = require("../controllers/storeController");

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/home", storeController.getHome);

storeRouter.get("/favourites", storeController.getFavorites);
storeRouter.get("/bookings", storeController.getBookings);

module.exports = storeRouter;
