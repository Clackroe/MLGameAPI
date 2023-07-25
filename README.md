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

| Endpoint                    | Method | Query Parameters                                                                                            | Description                               |
|-----------------------------|--------|------------------------------------------------------------------------------------------------------------|-------------------------------------------|
| `/teams`                    | GET    | None                                                                                                       | Get a list of all teams.                  |
| `/teams/:id`                | GET    | None                                                                                                       | Get a team by its ID.                     |
| `/teams`                    | GET    | `name` (string)                                                                                            | Get a team by its name.                   |
| `/teams`                    | POST   | `name` (string)                                                                                            | Create a new team.                        |
| `/teams/:id`                | PUT    | `name` (string)                                                                                            | Update an existing team by its ID.        |
| `/teams/:id`                | DELETE | None                                                                                                       | Delete a team by its ID.                  |
| `/players`                  | GET    | None                                                                                                       | Get a list of all players.                |
| `/players/:id`              | GET    | None                                                                                                       | Get a player by their ID.                 |
| `/players`                  | GET    | `epic_id` (string) OR `discord_id` (string)                                                                | Get a player by their Epic ID or Discord ID. |
| `/players`                  | POST   | `name` (string), `epic_id` (string), `discord_id` (string), `team_id` (string, optional)                   | Create a new player.                      |
| `/players/:id`              | PUT    | `name` (string), `epic_id` (string), `discord_id` (string), `team_id` (string, optional)                   | Update an existing player by their ID.    |
| `/players/:id`              | DELETE | None                                                                                                       | Delete a player by their ID.              |
| `/matches`                  | GET    | None                                                                                                       | Get a list of all matches.                |
| `/matches/:id`              | GET    | None                                                                                                       | Get a match by its ID.                    |
| `/matches`                  | GET    | `team_id` (string), `team_name` (string), `model_id` (string)                                              | Get matches by team ID, team name, or model ID. |
| `/matches`                  | POST   | `team_1_id` (string), `team_2_id` (string), `team_1_model_id` (string), `team_2_model_id` (string), `team_1_score` (number, optional), `team_2_score` (number, optional), `timestamp` (string, optional), `type` (string, optional), `winning_team_id` (string, optional), `winning_model_id` (string, optional) | Create a new match.                       |
| `/matches/:id`              | PUT    | `team_1_id` (string), `team_2_id` (string), `team_1_model_id` (string), `team_2_model_id` (string), `team_1_score` (number, optional), `team_2_score` (number, optional), `timestamp` (string, optional), `type` (string, optional), `winning_team_id` (string, optional), `winning_model_id` (string, optional) | Update an existing match by its ID.       |
| `/matches/:id`              | DELETE | None                                                                                                       | Delete a match by its ID.                 |
| `/models`                   | GET    | None                                                                                                       | Get a list of all models.                 |
| `/models/:id`               | GET    | None                                                                                                       | Get a model by its ID.                    |
| `/models`                   | GET    | `team_id` (string), `team_name` (string)                                                                   | Get models by team ID or team name.       |
| `/models`                   | POST   | `name` (string), `team_id` (string), `url` (string)                                                        | Create a new model.                       |
| `/models/:id`               | PUT    | `name` (string), `team_id` (string), `url` (string)                                                        | Update an existing model by its ID.       |
| `/models/:id`               | DELETE | None                                                                                                       | Delete a model by its ID.                 |

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
