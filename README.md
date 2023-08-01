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

# API Endpoints

| Endpoint       | Method | Description                                                   | Query Parameters                                                                                                                  |
| -------------- | ------ | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| /teams         | GET    | Get all teams or filter by name                               | name: string (optional)                                                                                                           |
| /teams/:id     | GET    | Get a team by ID                                              |                                                                                                                                   |
| /teams         | POST   | Create a new team                                             | name: string, eq_elo: number, trained_elo: number                                                                                 |
| /teams/:id     | PUT    | Update an existing team by ID                                 | name: string, eq_elo: number, trained_elo: number                                                                                 |
| /teams/:id     | DELETE | Delete a team by ID                                           |                                                                                                                                   |
| /players       | GET    | Get all players or filter by Epic ID or Discord ID            | epic_id: string (optional), discord_id: string (optional)                                                                         |
| /players/:id   | GET    | Get a player by ID                                            |                                                                                                                                   |
| /players       | POST   | Create a new player                                           | name: string, epic_id: string, discord_id: string, team_id: string (optional), email: string (optional), image: string (optional) |
| /players/:id   | DELETE | Delete a player by ID                                         |                                                                                                                                   |
| /matches       | GET    | Get all matches or filter by team ID or team name or model ID | team_id: string (optional), team_name: string (optional)                                                                          |
| /matches/:id   | GET    | Get a match by ID                                             |                                                                                                                                   |
| /matches       | POST   | Create a new match                                            | id: string, type: string                                                                                                          |
| /matches/:id   | DELETE | Delete a match by ID                                          |                                                                                                                                   |
| /equations     | GET    | Get all equations or filter by team ID or user ID             | team_id: string (optional), user_id: string (optional)                                                                            |
| /equations     | POST   | Create a new equation                                         | name: string, team_id: string, user_id: string, elo_contribute: number, content: any (optional)                                   |
| /equations/:id | PUT    | Update an existing equation by ID                             | name: string, team_id: string, user_id: string, elo_contribute: number, content: any (optional)                                   |
| /testDocker    | GET    | Test Docker functionality                                     |                                                                                                                                   |

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
