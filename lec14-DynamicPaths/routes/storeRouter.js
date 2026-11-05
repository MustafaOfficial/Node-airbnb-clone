const express = require("express");
const path = require("path");

const storeRouter = express.Router();
const rootPath = require("../utils/rootPathUtil");

// const { addedHomes } = require("../controllers/homeController");
// const hostController = require("../controllers/hostController");
const storeController = require("../controllers/storeController");

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/home", storeController.getHome);

storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/home/:homeId", storeController.getHomeDetail);

storeRouter.get("/favourites", storeController.getFavourites);
storeRouter.post("/favourites", storeController.postAddToFavourites);
storeRouter.post(
  "/favourites/:homeId",
  storeController.postRemoveFromFavorites,
);

module.exports = storeRouter;
