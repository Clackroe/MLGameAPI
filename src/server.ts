import express from "express";
const app = express();
const port = 3000; // default port to listen

import { testFunc } from "./db";
// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello world!");
  testFunc();
});

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started on http://localhost:${port}`);
});
