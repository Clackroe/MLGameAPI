import "express-async-errors";
import { NextFunction, Request, Response } from "express";
import express from "express";
import { v4 as uuidv4 } from "uuid";
const app = express();
const port = 3001; // default port to listen

import { MatchStatus } from "@prisma/client";

import rateLimit from "express-rate-limit";

import * as db from "./db";

//-------------------------------Middleware-------------------------------

//Authorize Access
async function accessHandler(req: Request, res: Response, next: NextFunction) {
  const method = req.method as string;
  const token = req.headers.token;
  if (!token) {
    return res
      .status(401)
      .send({ error: "Unauthorized | No Credentials Sent!" });
  }
  const validToken = await db.validateToken(token as string);
  const access = validToken.token.access;

  if (!validToken.valid) {
    res.status(401).send({ error: "Unauthorized Token" });
  }

  switch (access) {
    case "ADMIN":
      next();
      break;
    case "READWRITEDELETE":
      next();
      break;
    case "READONLY":
      if (method != "GET") {
        res
          .status(401)
          .send({ error: `Unauthorized to make '${method}' request` });
      } else {
        next();
      }
      break;
    case "READWRITE":
      if (method != "GET" && method != "POST" && method != "PUT") {
        res
          .status(401)
          .send({ error: `Unauthorized to make '${method}' request` });
      } else {
        next();
      }
      break;
  }
}
app.use(accessHandler);

//RateLimiter
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // hour
  max: 2000, // Limit each IP to 2000 requests per `window` per hour
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: async (request) => {
    //Skip admin tokens
    const valid = await db.validateToken(request.headers.token as string);
    return valid.token.access == "ADMIN";
  },
  message:
    "You have reached your maximum number of requests this hour, try again soon.",
});

app.use(limiter);

//Handle Errors
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

//Log the Requests
async function logRequest(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.token;
  const tokenData = await db.validateToken(token as string);
  console.log(
    `${tokenData.token.name} made a `,
    req.method,
    req.path,
    `request at ${new Date().toISOString()}`
  );
  next();
}
logRequest;

app.use(logRequest);

//-------------------------------Teams Routes-------------------------------
//get teams by name /teams?name={name}

app.get("/teams", async (req: Request, res: Response, next: NextFunction) => {
  try {
    //get teams by name /teams?name={name}
    const name = req.query.name as string;
    if (name) {
      const team = await db.getTeamByName(name);

      res.json(team);
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
      res.json(team);
    } catch (error) {
      next(error);
    }
  }
);

app.post("/teams", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await db.upsertTeam({
      id: uuidv4(),
      name: (req.query.name as string) || undefined,
      totalEqMatches: undefined,
      totalEqMatchesWon: undefined,
      totalEqMatchesLost: undefined,
      mu: undefined,
      sigma: undefined,
      ranking: undefined,
      accent: (req.query.accent as string) || undefined,
      logo: (req.query.logo as string) || undefined,
      primary: (req.query.primary as string) || undefined,
      screen: (req.query.screen as string) || undefined,
      secondary: (req.query.secondary as string) || undefined,
    });
    res.json({ message: "Team Created" });
  } catch (error) {
    next(error);
  }
});

app.put(
  "/teams/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const team = await db.upsertTeam({
        id: (req.params.id as string) || undefined,
        name: (req.query.name as string) || undefined,
        totalEqMatches: undefined,
        totalEqMatchesWon: undefined,
        totalEqMatchesLost: undefined,
        mu: undefined,
        sigma: undefined,
        ranking: undefined,
        accent: (req.query.accent as string) || undefined,
        logo: (req.query.logo as string) || undefined,
        primary: (req.query.primary as string) || undefined,
        screen: (req.query.screen as string) || undefined,
        secondary: (req.query.secondary as string) || undefined,
      });
      res.json({ message: "Team Updated", team_id: team.id });
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
    const name = req.query.name as string;
    if (epic_id) {
      const player = await db.getUserByEpicId(epic_id);
      res.json(player);
    } else if (name) {
      const player = await db.getUserByName(name);
      res.json(player);
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
      res.json(player);
    } catch (error) {
      next(error);
    }
  }
);

app.post(
  "/players",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await db.upsertUser({
        id: uuidv4(),
        name: (req.query.name as string) || undefined,
        epic_id: (req.query.epic_id as string) || undefined,
        discord_id: (req.query.discord_id as string) || undefined,
        team_id: (req.query.team_id as string) || undefined,
        email: (req.query.email as string) || undefined,
        image: (req.query.image as string) || undefined,
        emailVerified: undefined,
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
      const user = await db.upsertUser({
        id: (req.params.id as string) || undefined,
        name: (req.query.name as string) || undefined,
        epic_id: (req.query.epic_id as string) || undefined,
        discord_id: (req.query.discord_id as string) || undefined,
        team_id: (req.query.team_id as string) || undefined,
        email: (req.query.email as string) || undefined,
        image: (req.query.image as string) || undefined,
        emailVerified: undefined,
      });
      res.json({ message: "Player Updated", user_id: user.id });
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

// ------------------------- EquationMatch Routes -------------------------

// //Matches Routes
// Can also get matches by team_id /matches?team_id={team_id} or team_name /matches?team_name={team_name} or by model_id /matches?model_id={model_id}
app.get("/matches", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const team_id = req.query.team_id as string;
    if (team_id) {
      const matches = await db.getEquationMatchesByTeamId(team_id);
      res.json(matches);
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
      const match = await db.getEquationMatchById(id);
      res.json(match);
    } catch (error) {
      next(error);
    }
  }
);

app.post(
  "/matches",
  async (req: Request, res: Response, next: NextFunction) => {
    // Cast to MatchStatus "PENDING" | "PLANNED" | "STARTED" | "INPROGRESS" | "FINISHED" | "CANCELLED"
    const status = (req.query.status as MatchStatus) || undefined;
    const id = uuidv4();
    try {
      const match = await db.upsertEquationMatch({
        id: id,
        type: req.query.type as string,
        status: status,
        started: new Date(req.query.started as string) || undefined, // Provide a value for started
        ended: new Date(req.query.started as string) || undefined,
        planned_start: new Date(req.query.started as string) || undefined,
      });
      res.json({ message: "Match Created", id: match.id });
    } catch (error) {
      next(error);
    }
  }
);

app.put(
  "/matches/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const status = (req.query.status as MatchStatus) || undefined; // Cast to MatchStatus
    try {
      const eqMatch = await db.upsertEquationMatch({
        id: req.params.id,
        type: req.query.type as string,
        status: status,
        started: new Date(req.query.started as string) || undefined, // Provide a value for started
        ended: new Date(req.query.started as string) || undefined,
        planned_start: new Date(req.query.started as string) || undefined,
      });
      res.json({ message: "Match Updated", id: eqMatch.id });
    } catch (error) {
      next(error);
    }
  }
);

app.delete(
  "/matches/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await db.deleteEquationMatch(req.params.id);
      res.json({ message: "Match Deleted" });
    } catch (error) {
      next(error);
    }
  }
);

app.post(
  "/matches/addTeam/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = await db.addTeamToEquationMatch(
        req.params.id as string,
        req.params.equationId as string,
        req.query.teamId as string,
        parseInt(req.query.score as string),
        Boolean(req.query.winner as string)
      );
      res.json({ message: "Team Added to Match", id: id });
    } catch (error) {
      next(error);
    }
  }
);

app.post(
  "/matches/finishMatch/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      db.updateEquationMatchTeamMuSigma(req.params.id);
      res.json({ message: "Successfully finished match and calculations" });
    } catch (error) {
      next(error);
    }
  }
);

// ------------------------- Equation Routes -------------------------

app.get(
  "/equations",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const team_id = req.query.team_id as string;
      const user_id = req.query.user_id as string;
      if (team_id) {
        const equations = await db.getEquationsByTeamId(team_id);
        res.json({ equations });
      } else if (user_id) {
        const equations = await db.getEquationByUserId(user_id);
        res.json({ equations });
      } else {
        const equations = await db.getAllEquations();
        res.json({ equations });
      }
    } catch (error) {
      next(error);
    }
  }
);

app.get(
  "/equations/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const equation = await db.getEquationById(id);
      res.json(equation);
    } catch (error) {
      next(error);
    }
  }
);

app.post(
  "/equations",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.query.name as string);
    console.log(req.query.name);
    //console.log(req.body.);

    console.log("found elo_contribute to be undefined");
    try {
      await db.upsertEquation({
        id: uuidv4(),
        name: (req.query.name as string) || undefined,
        team_id: (req.query.team_id as string) || undefined,
        user_id: (req.query.user_id as string) || undefined,
        elo_contribute:
          parseInt(req.query.elo_contribute as string) || undefined,
        content: req.query.content || undefined,
      });
      res.json({ message: "Equation Created" });
    } catch (error) {
      next(error);
    }
  }
);

app.put(
  "/equations/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const eq = await db.upsertEquation({
        id: (req.params.id as string) || undefined,
        name: (req.query.name as string) || undefined,
        team_id: (req.query.team_id as string) || undefined,
        user_id: (req.query.user_id as string) || undefined,
        elo_contribute:
          parseInt(req.query.elo_contribute as string) || undefined,
        content: req.query.content || undefined,
      });
      res.json({ message: "Equation Updated", equationId: eq.id });
    } catch (error) {
      next(error);
    }
  }
);

// start server
app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
