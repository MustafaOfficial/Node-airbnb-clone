//core Modules
const path = require("path");

//External modules
const express = require("express");

//local Modules
const userRouter = require("./routes/userRouter");
const { hostRouter } = require("./routes/hostRouter");
const rootPath = require("./utils/rootPathUtil");
const { title } = require("process");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(rootPath, "public")));

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(express.urlencoded());

app.use(userRouter);
app.use("/host", hostRouter);

//handling undefined paths by senduing 404 response
app.use((req, res, next) => {
  res.status(404);
  // res.sendFile(path.join(__dirname, "../", "views", "error404.html"));
  res.render("error404", { title: "Error 404", currentPage: "error404" });
});

app.listen(3000, () => {
  console.log("Server is litning on port 3000");
});
