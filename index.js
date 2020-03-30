// Dependencies

const express = require("express");
const DataStore = require("nedb");

// App
const app = express();
const port = 7070;

app.listen(port, () => {
  console.log("####### SERVER STARTING #######");
  console.log("RUNNING ON PORT: " + port);
});
app.use(express.json({ limit: "1mb" }));
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
// Database
const db = new DataStore("messages.db");
db.loadDatabase();

// Routes
app.get("/getMsg", (req, res) => {
  db.find({}, (err, data) => {
    if (err) {
      res.end();
      console.log("ERROR FETCHING DATA");
      return;
    }
    console.log(data);
    res.json(data);
  });
});

app.post("/sendMsg", (req, res) => {
  const data = req.body;
  console.log(data);
  db.insert(data);
  db;
});
