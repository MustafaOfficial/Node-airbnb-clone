//core Modules
const path = require("path");

//External modules
const express = require("express");

//local Modules
const storeRouter = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter");
const { notFoundRouter } = require("./routes/notFoundRouter");
const rootPath = require("./utils/rootPathUtil");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(rootPath, "public")));

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(express.urlencoded());

app.use(storeRouter);
app.use("/host", hostRouter);

//handling undefined paths by senduing 404 response
console.log("Just above app.use(notFoundRouter);");
app.use(notFoundRouter);

app.listen(3001, () => {
  console.log("Server is litning on port 3001");
});
