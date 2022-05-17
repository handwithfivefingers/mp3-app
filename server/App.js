const express = require("express");
const env = require("dotenv");
const app = express();
const qs = require("query-string");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
var cookieParser = require("cookie-parser");
//Routes

env.config();

const AuthRoute = require("./route/auth");
const Music = require("./route/music");

// DB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@todo1242021.hehew.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("DB connected");
  });

// middleware

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3002", process.env.REACT_APP_BASE_URL],
    // origin: ,
    //
    //
  })
);

// Routes middleware
app.use("/public", express.static(path.join(__dirname, "uploads")));

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use("/api", AuthRoute);
app.use("/api", Music);

app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Request-Headers", "POST");
  next();
});
// App run
app.listen(3003, () => {
  console.log(`Server is running on port 3003`);
});

// const auth = router.get('/',)
