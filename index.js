'use strict';
const express = require("express");
const useragent = require("express-useragent");

const app = express();
const apiRouter = express.Router();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use("/api", apiRouter);

// Match any url under the "api" path
apiRouter.get("*", useragent.express(), (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.ip;
  const lang = req.acceptsLanguages()[0];
  const os = req.useragent.os;
  
  res.json({
    ipaddress: ip,
    language: lang,
    software: os
  });
    
});

// Serve some instructions on any other path
app.get("*", (req, res) => {
  res.render("index");
});

const listener = app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening on ${listener.address().port}`);
});