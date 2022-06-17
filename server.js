const express = require("express");
const cors = require("cors");
const env = require("dotenv");
// const bodyparser = require("body-parser"); deprecated!!
const app = express();

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MacoDB!");
  })
  .catch((error) => {
    console.log("MacoDB seems out of your reach, X84", ". Possible Reason: ", error);
  });

env.config();

let corsConfig = { origin: "http://localhost:8081" };

app.use(cors(corsConfig));
// app.use(bodyparser); // deprecated!!
app.use(express.json()); // parse 'application/json' content-type
app.use(express.urlencoded({ extended: true })); // parse 'application/x-www-form-urlencoded' content-type

// req.method middleware logger
app.use((req, res, next) => {
  console.log(req.method);
  next();
});

app.get("/", (req, res) => {
  res.json({ success: true });
});

app.get("/category/:item", (req, res) => {
  const item = req.params.item;
  res.send(item);
});


//routers
require("./routes/collection.routes")(app);

app.get("*", (req, res) => {
  res.send("You hit a wildcard!");
});



//invoke app
app.listen(process.env.PORT, () => {
  console.log("Panting on port:", process.env.PORT);
});
