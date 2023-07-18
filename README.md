# Express JS API Endpoints Documentation

This markdown file documents the API endpoints of an Express.js application. The application provides various endpoints to interact with a database containing information about teams, users, matches, and models.

**Note:** The API assumes the usage of the `express-async-errors` middleware for handling asynchronous errors. Additionally, it relies on a database module (`./db`) and mock data module (`./mockData`) for data operations and inserting mock data.

## Table of Contents

- [Insert Mock Data](#insert-mock-data)
- [Get All Teams](#get-all-teams)
- [Get All Users](#get-all-users)
- [Get All Matches](#get-all-matches)
- [Get User by UserID](#get-user-by-userid)
- [Get Team by TeamID](#get-team-by-teamid)
- [Get Users of a Team](#get-users-of-a-team)
- [Get Matches of a Team](#get-matches-of-a-team)
- [Get Models of a Team](#get-models-of-a-team)
- [Get Match by MatchID](#get-match-by-matchid)
- [Get Model by ModelID](#get-model-by-modelid)

## Endpoints

### Insert Mock Data

Endpoint to create and insert mock data into the database.

- **URL:** `/insertMockData`
- **HTTP Method:** GET
- **Response:**
  - Success: `Done!` with status code 200
  - Error: Returns an error message with status code 500 for internal server errors.

### Get All Teams

Endpoint to get information about all teams.

- **URL:** `/all/teams`
- **HTTP Method:** GET
- **Response:**
  - Success: Returns an array of team objects.
  - Error: Returns a message if no teams are found or an internal server error occurs.

### Get All Users

Endpoint to get information about all users.

- **URL:** `/all/users`
- **HTTP Method:** GET
- **Response:**
  - Success: Returns an array of user objects.
  - Error: Returns a message if no users are found or an internal server error occurs.

### Get All Matches

Endpoint to get information about all matches.

- **URL:** `/all/matches`
- **HTTP Method:** GET
- **Response:**
  - Success: Returns an array of match objects.
  - Error: Returns a message if no matches are found or an internal server error occurs.

### Get User by UserID

Endpoint to get information about a specific user based on their userID.

- **URL:** `/users/:userID`
- **HTTP Method:** GET
- **URL Parameters:**
  - `userID` (string): The unique identifier of the user.
- **Response:**
  - Success: Returns the user object.
  - Error: Returns a message if the user is not found or an internal server error occurs.

### Get Team by TeamName

Endpoint to get information about a specific team based on its teamName.

- **URL:** `/teams/:teamName`
- **HTTP Method:** GET
- **URL Parameters:**
  - `teamName` (string): The unique identifier of the team.
- **Response:**
  - Success: Returns the team object.
  - Error: Returns a message if the team is not found or an internal server error occurs.

### Get Users of a Team

Endpoint to get all users belonging to a specific team.

- **URL:** `/teams/:teamName/users`
- **HTTP Method:** GET
- **URL Parameters:**
  - `teamName` (string): The unique identifier of the team.
- **Response:**
  - Success: Returns an array of user objects belonging to the team.
  - Error: Returns a message if the team is not found or an internal server error occurs.

### Get Matches of a Team

Endpoint to get all matches involving a specific team.

- **URL:** `/teams/:teamName/matches`
- **HTTP Method:** GET
- **URL Parameters:**
  - `teamName` (string): The unique identifier of the team.
- **Response:**
  - Success: Returns an array of match objects involving the team.
  - Error: Returns a message if the team is not found or an internal server error occurs.

### Get Models of a Team

Endpoint to get all models associated with a specific team.

- **URL:** `/teams/:teamName/models`
- **HTTP Method:** GET
- **URL Parameters:**
  - `teamName` (string): The unique identifier of the team.
- **Response:**
  - Success: Returns an array of model objects associated with the team.
  - Error: Returns a message if the team is not found or an internal server error occurs.

### Get Match by MatchID

Endpoint to get information about a specific match based on its matchID.

- **URL:** `/matches/:matchID`
- **HTTP Method:** GET
- **URL Parameters:**
  - `matchID` (string): The unique identifier of the match.
- **Response:**
  - Success: Returns the match object.
  - Error: Returns a message if the match is not found or an internal server error occurs.

### Get Model by ModelID

Endpoint to get information about a specific model based on its modelID.

- **URL:** `/models/:modelID`
- **HTTP Method:** GET
- **URL Parameters:**
  - `modelID` (string): The unique identifier of the model.
- **Response:**
  - Success: Returns the model object.
  - Error: Returns a message if the model is not found or an internal server error occurs.

### Error Handlers

If an endpoint is not found (404), the server will return a "Not Found" message with status code 404.

For all other errors, an internal server error (500) will be returned along with an error message.

## Starting the Server

To start the server, run the following command:

```bash
npm run start
```

The server will be accessible at `http://localhost:3000`, assuming the default port (3000) is used.
