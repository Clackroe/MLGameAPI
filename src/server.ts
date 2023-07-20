import "express-async-errors";
import { NextFunction, Request, Response } from "express";
import express from "express";
import { v4 as uuidv4 } from "uuid";
const app = express();
const port = 3000; // default port to listen

import * as db from "./db";

async function accessHandler(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.token;
  if (!token) {
    return res
      .status(401)
      .send({ error: "Unauthorized | No Credentials Sent!" });
  }

  const validToken = await db.validateToken(token as string);
  if (validToken.valid) {
    next();
  } else {
    res.status(401).send({ error: "Unauthorized" });
  }
}

app.use(accessHandler);

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  console.error(err.stack);
  res.status(500).send({
    error: "Something Went Wrong!",
    name: err.name,
    message: err.message,
  });
}
app.use(errorHandler);

function logRequest(req: Request, res: Response, next: NextFunction) {
  console.log(req.method, req.path);
  next();
}
logRequest;

app.use(logRequest);

//Teams Routes
//get teams by name /teams?name={name}
app.get("/teams", async (req: Request, res: Response, next: NextFunction) => {
  try {
    //get teams by name /teams?name={name}
    const name = req.query.name as string;
    if (name) {
      const team = await db.getTeamByName(name);

      res.json({ team });
    } else {
      const teams = await db.getAllTeams();

      res.json({ teams });
    }
  } catch (error) {
    next(error);
  }
});

app.get(
  "/teams/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const team = await db.getTeamById(id);
      res.json({ team });
    } catch (error) {
      next(error);
    }
  }
);

app.post("/teams", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await db.createTeam({ id: uuidv4(), name: req.query.name as string });
    res.json({ message: "Team Created" });
  } catch (error) {
    next(error);
  }
});

app.put(
  "/teams/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await db.updateTeam(req.params.id, {
        id: req.params.id as string,
        name: req.query.name as string,
      });
      res.json({ message: "Team Updated" });
    } catch (error) {
      next(error);
    }
  }
);

app.delete(
  "/teams/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await db.deleteTeam(req.params.id);
      res.json({ message: "Team Deleted" });
    } catch (error) {
      next(error);
    }
  }
);

// //Users Routes
// can also do EITHER /users?epic_id={epic_id} OR /users?discord_id={discord_id}
app.get("/players", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const epic_id = req.query.epic_id as string;
    const discord_id = req.query.discord_id as string;
    if (epic_id) {
      const player = await db.getUserByEpicId(epic_id);
      res.json({ player });
    } else if (discord_id) {
      const player = await db.getUserByDiscordId(discord_id);
      res.json({ player });
    } else {
      const players = await db.getAllUsers();
      res.json({ players });
    }
  } catch (error) {
    next(error);
  }
});

app.get(
  "/players/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const player = await db.getUserById(id);
      res.json({ player });
    } catch (error) {
      next(error);
    }
  }
);

app.post(
  "/players",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await db.createUser({
        id: uuidv4(),
        name: req.query.name as string,
        epic_id: req.query.epic_id as string,
        discord_id: req.query.discord_id as string,
        team_id: req.query.team_id as string,
      });
      res.json({ message: "Player Created" });
    } catch (error) {
      next(error);
    }
  }
);

app.put(
  "/players/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await db.updateUser(req.params.id, {
        id: req.params.id as string,
        name: req.query.name as string,
        epic_id: req.query.epic_id as string,
        discord_id: req.query.discord_id as string,
        team_id: req.query.team_id as string,
      });
      res.json({ message: "Player Updated" });
    } catch (error) {
      next(error);
    }
  }
);

app.delete(
  "/players/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await db.deleteUser(req.params.id);
      res.json({ message: "Player Deleted" });
    } catch (error) {
      next(error);
    }
  }
);

// //Matches Routes
// Can also get matches by team_id /matches?team_id={team_id} or team_name /matches?team_name={team_name} or by model_id /matches?model_id={model_id}
app.get("/matches", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const team_id = req.query.team_id as string;
    const team_name = req.query.team_name as string;
    const model_id = req.query.model_id as string;
    if (team_id) {
      const matches = await db.getMatchesByTeamID(team_id);
      res.json({ matches });
    } else if (team_name) {
      const matches = await db.getMatchesByTeamName(team_name);
      res.json({ matches });
    } else if (model_id) {
      const matches = await db.getMatchesByModelID(model_id);
      res.json({ matches });
    } else {
      const matches = await db.getAllMatches();
      res.json({ matches });
    }
  } catch (error) {
    next(error);
  }
});

app.get(
  "/matches/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const match = await db.getMatchById(id);
      res.json({ match });
    } catch (error) {
      next(error);
    }
  }
);

app.post(
  "/matches",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await db.createMatch({
        id: uuidv4(),
        team_1: req.query.team_1_id as string,
        team_2: req.query.team_2_id as string,
        team_1_model: req.query.team_1_model_id as string,
        team_2_model: req.query.team_2_model_id as string,
        team_1_score: parseInt(req.query.team_1_score as string),
        team_2_score: parseInt(req.query.team_2_score as string),
        timestamp: new Date(req.query.timestamp as string),
        type: req.query.type as string,
        winning_team_id: req.query.winning_team_id as string,
        winning_model_id: req.query.winning_model_id as string,
      });
      res.json({ message: "Match Created" });
    } catch (error) {
      next(error);
    }
  }
);

app.put(
  "/matches/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await db.updateMatch(req.params.id, {
        id: req.params.id as string,
        team_1: req.query.team_1_id as string,
        team_2: req.query.team_2_id as string,
        team_1_model: req.query.team_1_model_id as string,
        team_2_model: req.query.team_2_model_id as string,
        team_1_score: parseInt(req.query.team_1_score as string),
        team_2_score: parseInt(req.query.team_2_score as string),
        timestamp: new Date(req.query.timestamp as string),
        type: req.query.type as string,
        winning_team_id: req.query.winning_team_id as string,
        winning_model_id: req.query.winning_model_id as string,
      });
      res.json({ message: "Match Updated" });
    } catch (error) {
      next(error);
    }
  }
);

app.delete(
  "/matches/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await db.deleteMatch(req.params.id);
      res.json({ message: "Match Deleted" });
    } catch (error) {
      next(error);
    }
  }
);

// //Models Routes

app.get("/models", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const team_name = req.query.team_name as string;
    const team_id = req.query.team_id as string;
    if (team_name) {
      const models = await db.getModelsByTeamName(team_name);
      res.json({ models });
    } else if (team_id) {
      const models = await db.getModelsByTeamID(team_id);
      res.json({ models });
    } else {
      const models = await db.getAllModels();
      res.json({ models });
    }
  } catch (error) {
    next(error);
  }
});

app.get(
  "/models/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const model = await db.getModelById(id);
      res.json({ model });
    } catch (error) {
      next(error);
    }
  }
);

app.post("/models", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await db.createModel({
      id: uuidv4(),
      name: req.query.name as string,
      team_id: req.query.team_id as string,
      url: req.query.url as string,
    });
    res.json({ message: "Model Created" });
  } catch (error) {
    next(error);
  }
});

app.put(
  "/models/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await db.updateModel(req.params.id, {
        id: req.params.id as string,
        name: req.query.name as string,
        team_id: req.query.team_id as string,
        url: req.query.url as string,
      });
      res.json({ message: "Model Updated" });
    } catch (error) {
      next(error);
    }
  }
);

app.delete(
  "/models/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await db.deleteModel(req.params.id);
      res.json({ message: "Model Deleted" });
    } catch (error) {
      next(error);
    }
  }
);

// start server
app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
