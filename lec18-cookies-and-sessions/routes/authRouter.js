const express = require("express");

const authRouter = express.Router();

// const { addedHomes } = require("../controllers/homeController");
// const hostController = require("../controllers/hostController");
const authController = require("../controllers/authController");

authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);
authRouter.post("/logout", authController.postLogout);

module.exports = authRouter;
