# API Documentation

This document provides details on how to use the Express API provided for managing teams, players, matches, and models.

## Table of Contents

- [Unity Script Docs](UnityScripts/README.md)

- [Docker](#docker)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Endpoints](#endpoints)

## Base URL

The base URL for accessing the API is `http://localhost:3000`.

## Authentication

The API requires a valid token to access its endpoints. Include the "token" in the `headers` of your requests. If the token is not provided or is invalid, the API will return a `401 Unauthorized` response.

## Error Handling

The API handles errors and returns appropriate status codes. If an error occurs, the API will respond with a JSON object containing the error details.

## Endpoints

| Endpoint | Method | Description | Query Parameters |
| Endpoint | Method | Description | Query Parameters |
|-------------------------------------------|--------|----------------------------------------------------------|-----------------------------------------------------------------|
| `/teams` | GET | Get a list of teams or filter by name. | `name`: Filter by team name. |
| `/teams/:id` | GET | Get team details by ID. | |
| `/teams` | POST | Create a new team. | |
| `/teams/:id` | PUT | Update team details by ID. | |
| `/teams/:id` | DELETE | Delete a team by ID. | |
| `/players` | GET | Get a list of players or filter by Epic ID or name. | `epic_id`: Filter by player Epic ID, `name`: Filter by player name. |
| `/players/:id` | GET | Get player details by ID. | |
| `/players` | POST | Create a new player. | |
| `/players/:id` | PUT | Update player details by ID. | |
| `/players/:id` | DELETE | Delete a player by ID. | |
| `/matches` | GET | Get a list of matches or filter by team ID or team name.| `team_id`: Filter by team ID, `team_name`: Filter by team name. |
| `/matches/:id` | GET | Get match details by ID. | |
| `/matches` | POST | Create a new match. | `type`: Match type, `status`: Match status, `started`: Match start date. |
| `/matches/:id` | PUT | Update match details by ID. | `type`: Match type, `status`: Match status, `started`: Match start date. |
| `/matches/:id` | DELETE | Delete a match by ID. | |
| `/equations` | GET | Get a list of equations or filter by team ID or user ID.| `team_id`: Filter by team ID, `user_id`: Filter by user ID. |
| `/equations/:id` | GET | Get equation details by ID. | |
| `/equations` | POST | Create a new equation. | `name`: Equation name, `team_id`: Team ID, `user_id`: User ID, `elo_contribute`: Elo contribution, `content`: Equation content. |
| `/equations/:id` | PUT | Update equation details by ID. | `name`: Equation name, `team_id`: Team ID, `user_id`: User ID, `elo_contribute`: Elo contribution, `content`: Equation content. |
| `/matches/addTeam/:id` | POST | Add a team to a match. | `equationId`: Equation ID, `teamId`: Team ID, `score`: Team's score, `winner`: Boolean indicating if the team won. |
| `/matches/finishMatch/:id` | POST | Finish a match and calculate team Mu and Sigma. | |

---

Please note that some endpoints require query parameters to be provided for proper operation. Make sure to replace the `:id` placeholder in the endpoints with the actual ID when using specific routes. If you have any questions or encounter issues, please refer to the API documentation or contact the API developer for assistance.

---

---

## Docker

Make sure you have docker-compose installed on your machine.

Clone this repo

```bash
git clone https://github.com/Clackroe/MLGameAPI
```

Next add your database url to .env.example and rename to .env

Build the image:

```bash
docker-compose build
```

Run the container:

```bash
docker-compose up -d
```

The api will now be running on localhost:6001
