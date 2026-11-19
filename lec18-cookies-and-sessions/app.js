//core Modules
const path = require("path");
const cookieParser = require("cookie-parser");

//External modules
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

//local Modules
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const notFoundRouter = require("./routes/notFoundRouter");
const rootPath = require("./utils/rootPathUtil");
const { default: mongoose } = require("mongoose");
const authRouter = require("./routes/authRouter");

const MONGO_URL =
  "mongodb+srv://root:root@homescluster.xwndjiz.mongodb.net/airbnb";

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(rootPath, "public")));
// app.use(cookieParser());
app.use(express.urlencoded());

const store = new MongoDBStore({
  uri: MONGO_URL,
  collection: "sessions",
});

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use(
  session({
    secret: "This-is-just-a-test=secret=string",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { maxAge: 2 * 60 * 1000 },
  }),
);

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  next();
});

const publicPaths = ["/home", "/login"];

app.use((req, res, next) => {
  const isPublic = publicPaths.some(
    (p) => req.path === p || req.path.startsWith(p + "/"),
  );

  if (req.session.isLoggedIn || isPublic) {
    next();
  } else {
    res.redirect("/login");
  }
});

app.use(storeRouter);
app.use("/host", hostRouter);
app.use(authRouter);
app.use(notFoundRouter);

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
