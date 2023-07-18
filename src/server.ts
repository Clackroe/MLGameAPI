import express from "express";
const app = express();
const port = 3000; // default port to listen

import { getAllTeams, getTeam } from "./db";
import { insertMockData } from "./mockData";

app.get("/", async (req, res) => {
  try {
    await insertMockData();
    res.send("Done!");
  } catch (error) {
    console.error("Error in the main function:", error);
    res.send("Error!" + error);
  }
});
app.get("/allteams", (req, res) => {
  const teams = getAllTeams();
  if (teams) {
    res.send(teams);
  } else {
    res.send("No teams found");
  }
});

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
