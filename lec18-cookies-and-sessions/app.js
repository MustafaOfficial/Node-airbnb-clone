//core Modules
const path = require("path");
const cookieParser = require("cookie-parser");

//External modules
const express = require("express");

//local Modules
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const notFoundRouter = require("./routes/notFoundRouter");
const rootPath = require("./utils/rootPathUtil");
const { default: mongoose } = require("mongoose");
const authRouter = require("./routes/authRouter");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(rootPath, "public")));
app.use(cookieParser());
app.use(express.urlencoded());

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.cookies.isLoggedIn === "true") {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);
app.use(authRouter);
//handling undefined paths by senduing 404 response
app.use(notFoundRouter);

const MONGO_URL =
  "mongodb+srv://root:root@homescluster.xwndjiz.mongodb.net/airbnb";

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB via Mongoose");
    app.listen(3001, () => {
      console.log("Server is litning on port 3001");
    });
  })
  .catch((err) => {
    console.log(err);
  });
