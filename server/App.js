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
const Cloud = require("./route/upload");

// DB
mongoose
  .connect(
    `mongodb+srv://hdme1995:hdme1995@todo1242021.hehew.mongodb.net/mp3-app?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("DB connected");
  });

// mongoose.set("useNewUrlParser", true);
// mongoose.set("useFindAndModify", true);
// mongoose.set("useCreateIndex", true);
// middleware

app.use(express.json());
app.use(cors());

// Routes middleware
app.use("/public", express.static(path.join(__dirname, "uploads")));



app.use("/api", AuthRoute);
app.use("/api", Cloud);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
// App run
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});

// const auth = router.get('/',)
