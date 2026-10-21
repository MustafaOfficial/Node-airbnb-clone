const express = require("express");
const path = require("path");

const userRouter = express.Router();
const { addedHomes } = require("./hostRouter");

userRouter.get("/", (req, res, next) => {
  res.render("home", { addedHomes, title: "BNB HOME", currentPage: "home" });
});

module.exports = userRouter;
