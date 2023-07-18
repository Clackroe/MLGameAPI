import "express-async-errors";
import { NextFunction, Request, Response, Router } from "express";
import express from "express";
const app = express();
const port = 3000; // default port to listen

import * as db from "./db";
import { insertMockData, insertMatches } from "./mockData";

app.use("/api");

// Middleware to handle async errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error in the main function:", err);
  res.status(500).send("Internal Server Error");
});

// Create and insert the mock data
app.get("/insertMockData", async (req, res, next) => {
  try {
    await insertMockData();
    await insertMatches();
    res.send("Done!");
  } catch (error) {
    next(error);
  }
});

// Get all teams
app.get("/all/teams", async (req, res, next) => {
  try {
    const allTeams = await db.getAllTeams();

    if (allTeams) {
      res.send(allTeams);
    } else {
      res.send(`No teams found`);
    }
  } catch (error) {
    next(error);
  }
});

app.get("/all/users", async (req, res, next) => {
  try {
    const allUsers = await db.getAllUsers();

    if (allUsers) {
      res.send(allUsers);
    } else {
      res.send(`No users found`);
    }
  } catch (error) {
    next(error);
  }
});

app.get("/all/matches", async (req, res, next) => {
  try {
    const allMatches = await db.getAllMatches();

    if (allMatches) {
      res.send(allMatches);
    } else {
      res.send(`No matches found`);
    }
  } catch (error) {
    next(error);
  }
});

// Get a specific user based on userID
app.get("/users/:userID", async (req, res, next) => {
  try {
    const userRes = await db.getUser(req.params.userID);

    if (userRes) {
      res.send(userRes);
    } else {
      res.send(`User with id:${req.params.userID} found`);
    }
  } catch (error) {
    next(error);
  }
});

// Get a specific team based on teamID
app.get("/teams/:teamName", async (req, res, next) => {
  try {
    const teamRes = await db.getTeam(req.params.teamName);

    if (teamRes) {
      res.send(teamRes);
    } else {
      res.send(`Team with id:${req.params.teamName} found`);
    }
  } catch (error) {
    next(error);
  }
});

app.get("/teams/:teamName/users", async (req, res, next) => {
  try {
    const teamUsers = await db.getTeamUsers(req.params.teamName);

    if (teamUsers) {
      res.send(teamUsers);
    } else {
      res.send(`Team with id:${req.params.teamName} found`);
    }
  } catch (error) {
    next(error);
  }
});

app.get("/teams/:teamName/matches", async (req, res, next) => {
  try {
    const teamMatches = await db.getTeamMatches(req.params.teamName);

    if (teamMatches) {
      res.send(teamMatches);
    } else {
      res.send(`Team with id:${req.params.teamName} found`);
    }
  } catch (error) {
    next(error);
  }
});

app.get("/teams/:teamName/models", async (req, res, next) => {
  try {
    const teamModels = await db.getTeamModels(req.params.teamName);

    if (teamModels) {
      res.send(teamModels);
    } else {
      res.send(`Team with id:${req.params.teamName} found`);
    }
  } catch (error) {
    next(error);
  }
});

app.get("/matches/:matchID", async (req, res, next) => {
  try {
    const match = await db.getMatch(req.params.matchID);

    if (match) {
      res.send(match);
    } else {
      res.send(`Match with id:${req.params.matchID} found`);
    }
  } catch (error) {
    next(error);
  }
});

app.get("/models/:modelID", async (req, res, next) => {
  try {
    const model = await db.getModel(req.params.modelID);

    if (model) {
      res.send(model);
    } else {
      res.send(`Model with id:${req.params.modelID} found`);
    }
  } catch (error) {
    next(error);
  }
});

// Error handler for routes that are not found
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// Error handler for all other errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error in the main function:", err);
  res.status(500).send("Internal Server Error");
});

// start server
app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
