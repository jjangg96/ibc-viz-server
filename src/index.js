const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const fs = require("fs");

let ssl;

try {
  ssl = {
    key: fs.readFileSync("~/key"),
    cert: fs.readFileSync("~/cert"),
  };
} catch {
  ssl = {};
}

http = require("http").createServer(ssl, app);

const db = require("./db");
const routes = require("./routes");
const io = require("socket.io")(http);

db.init(io);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/", routes);

const port = process.env.PORT || 80;

http.listen(port, () => {
  console.log("Your app is listening on port " + port);
});
