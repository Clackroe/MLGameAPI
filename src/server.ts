import express from "express";
const app = express();
const port = 3000; // default port to listen

import { getAllTeams, getTeam } from "./db";
import { insertMockData, insertMatches } from "./mockData";

//Create and insert the mock data
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

//Get all teams
app.get("/allteams", async (req, res) => {
  const teams = await getAllTeams();
  if (teams) {
    res.send(teams);
  } else {
    res.send("No teams found");
  }
});

//Get a specific team based on teamID
app.get("/teams/:teamID", (req, res) => {
  const teamRes = getTeam(req.params.teamID);

  if (teamRes) {
    res.send(teamRes);
  } else {
    res.send(`Team with id:${req.params.teamID} found`);
  }
});

// start the Express server
app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
