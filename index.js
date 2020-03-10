const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const history = require("connect-history-api-fallback");

const app = express();
app.use(express.static("dist"));
app.use(bodyParser.json());
app.use(history());
app.use(helmet());

let MONGODB_URI;

if (process.env.NODE_ENV === "production") {
  MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@srknzl-m0-development-cluster-hgcsl.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`;
} else {
  MONGODB_URI = require("./credentials/mongo_uri").MONGODB_URI;
}
console
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://www.alyasugelisimakademisi.com"
    );
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type,Cookie,Set-Cookie"
    );
    next();
  });
} else {
  app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "http://localhost:8080, http://localhost:3000"
    );
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type,Cookie,Set-Cookie"
    );
    next();
  });
}

let port = process.env.PORT;

if (port == null || port == "") {
  port = 3000;
}

mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  async err => {
    if (err) console.error(err);
    app.listen(port, () => {
      console.log("Server listening on port ", port);
    });
  }
);
