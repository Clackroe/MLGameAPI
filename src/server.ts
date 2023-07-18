import express from "express";
const app = express();
const port = 3000; // default port to listen

import { getTeam } from "./db";
import { insertMockData, insertMatches } from "./mockData";

// Create and insert the mock data
app.get("/insertMockData", async (req, res) => {
  try {
    await insertMockData();
    await insertMatches();
    res.send("Done!");
  } catch (error) {
    console.error("Error in the main function:", error);
    res.send("Error!" + error);
  }
});

// Get a specific team based on teamID
app.get("/teams/:teamName", async (req, res) => {
  const teamRes = await getTeam(req.params.teamName);

  if (teamRes) {
    res.send(teamRes);
  } else {
    res.send(`Team with id:${req.params.teamName} found`);
  }
});

// start the Express server
app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
