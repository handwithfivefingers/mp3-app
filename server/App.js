const express = require("express");
const env = require("dotenv");
const app = express();
const qs = require("query-string");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
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
app.use(cors());

// Routes middleware
app.use("/public", express.static(path.join(__dirname, "uploads")));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use("/api", AuthRoute);
app.use("/api", Music);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
// App run
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});

// const auth = router.get('/',)
