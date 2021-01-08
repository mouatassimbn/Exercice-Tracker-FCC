const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
require("dotenv").config();

const mongoConnect = require("./util/database").mongoConnect;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//Routes
const apiRoutes = require("./routes/api");
app.use("/api/exercise", apiRoutes);

mongoConnect(() => {
  const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });
});
