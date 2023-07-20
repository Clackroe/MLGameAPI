# API Documentation

This document provides details on how to use the Express API provided for managing teams, players, matches, and models.

## Base URL

The base URL for accessing the API is `http://localhost:3000`.

## Authentication

The API requires a valid token to access its endpoints. Include the token in the `headers` of your requests. If the token is not provided or is invalid, the API will return a `401 Unauthorized` response.

## Error Handling

The API handles errors and returns appropriate status codes. If an error occurs, the API will respond with a JSON object containing the error details.

## Teams

### Get All Teams

- **Endpoint**: `/teams`
- **Method**: `GET`
- **Description**: Get a list of all teams.

### Get Team by ID

- **Endpoint**: `/teams/:id`
- **Method**: `GET`
- **Description**: Get a team by its ID.

### Get Team by Name

- **Endpoint**: `/teams`
- **Method**: `GET`
- **Query Parameter**: `name` (string)
- **Description**: Get a team by its name.

### Create Team

- **Endpoint**: `/teams`
- **Method**: `POST`
- **Query Parameter**: `name` (string)
- **Description**: Create a new team.

### Update Team

- **Endpoint**: `/teams/:id`
- **Method**: `PUT`
- **Query Parameter**: `name` (string)
- **Description**: Update an existing team by its ID.

### Delete Team

- **Endpoint**: `/teams/:id`
- **Method**: `DELETE`
- **Description**: Delete a team by its ID.

## Players

### Get All Players

- **Endpoint**: `/players`
- **Method**: `GET`
- **Description**: Get a list of all players.

### Get Player by ID

- **Endpoint**: `/players/:id`
- **Method**: `GET`
- **Description**: Get a player by their ID.

### Get Player by Epic ID or Discord ID

- **Endpoint**: `/players`
- **Method**: `GET`
- **Query Parameter**: `epic_id` (string) OR `discord_id` (string)
- **Description**: Get a player by their Epic ID or Discord ID.

### Create Player

- **Endpoint**: `/players`
- **Method**: `POST`
- **Query Parameters**: `name` (string), `epic_id` (string), `discord_id` (string), `team_id` (string, optional)
- **Description**: Create a new player.

### Update Player

- **Endpoint**: `/players/:id`
- **Method**: `PUT`
- **Query Parameters**: `name` (string), `epic_id` (string), `discord_id` (string), `team_id` (string, optional)
- **Description**: Update an existing player by their ID.

### Delete Player

- **Endpoint**: `/players/:id`
- **Method**: `DELETE`
- **Description**: Delete a player by their ID.

## Matches

### Get All Matches

- **Endpoint**: `/matches`
- **Method**: `GET`
- **Description**: Get a list of all matches.

### Get Match by ID

- **Endpoint**: `/matches/:id`
- **Method**: `GET`
- **Description**: Get a match by its ID.

### Get Matches by Team ID, Team Name, or Model ID

- **Endpoint**: `/matches`
- **Method**: `GET`
- **Query Parameters**: `team_id` (string), `team_name` (string), `model_id` (string)
- **Description**: Get matches by team ID, team name, or model ID.

### Create Match

- **Endpoint**: `/matches`
- **Method**: `POST`
- **Query Parameters**: `team_1_id` (string), `team_2_id` (string), `team_1_model_id` (string), `team_2_model_id` (string), `team_1_score` (number, optional), `team_2_score` (number, optional), `timestamp` (string, optional), `type` (string, optional), `winning_team_id` (string, optional), `winning_model_id` (string, optional)
- **Description**: Create a new match.

### Update Match

- **Endpoint**: `/matches/:id`
- **Method**: `PUT`
- **Query Parameters**: `team_1_id` (string), `team_2_id` (string), `team_1_model_id` (string), `team_2_model_id` (string), `team_1_score` (number, optional), `team_2_score` (number, optional), `timestamp` (string, optional), `type` (string, optional), `winning_team_id` (string, optional), `winning_model_id` (string, optional)
- **Description**: Update an existing match by its ID.

### Delete Match

- **Endpoint**: `/matches/:id`
- **Method**: `DELETE`
- **Description**: Delete a match by its ID.

## Models

### Get All Models

- **Endpoint**: `/models`
- **Method**: `GET`
- **Description**: Get a list of all models.

### Get Model by ID

- **Endpoint**: `/models/:id`
- **Method**: `GET`
- **Description**: Get a model by its ID.

### Get Models by Team ID or Team Name

- **Endpoint**: `/models`
- **Method**: `GET`
- **Query Parameters**: `team_id` (string), `team_name` (string)
- **Description**: Get models by team ID or team name.

### Create Model

- **Endpoint**: `/models`
- **Method**: `POST`
- **Query Parameters**: `name` (string), `team_id` (string), `url` (string)
- **Description**: Create a new model.

### Update Model

- **Endpoint**: `/models/:id`
- **Method**: `PUT`
- **Query Parameters**: `name` (string), `team_id` (string), `url` (string)
- **Description**: Update an existing model by its ID.

### Delete Model

- **Endpoint**: `/models/:id`
- **Method**: `DELETE`
- **Description**: Delete a model by its ID.

---

Please note that some endpoints require query parameters to be provided for proper operation. Make sure to replace the `:id` placeholder in the endpoints with the actual ID when using specific routes. If you have any questions or encounter issues, please refer to the API documentation or contact the API developer for assistance.
