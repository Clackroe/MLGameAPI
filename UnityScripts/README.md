# MLApi Unity Communication

## Overview

`MLApi` is a C# script in Unity that provides a client for interacting with a remote API related to machine learning models and teams in a game. This script handles various HTTP requests like GET, POST, PUT, and DELETE to perform CRUD operations on teams, players, models, and matches. The API endpoint URL and a token are used for authentication.

## Table of Contents

1. [Overview](#overview)
2. [Class Structure](#class-structure)
   - [MLApi Class](#mlapi-class)
   - [Data Classes](#data-classes)
3. [Usage](#usage)
4. [Notes](#notes)

## Class Structure

### `MLApi` Class

This class is the main script responsible for handling API interactions. It contains methods for performing various CRUD operations on teams, players, models, and matches.

#### Properties

- `URL`: The base URL of the remote API.
- `TOKEN`: The authentication token used for accessing the API.
- `TEAMS_ENDPOINT`, `PLAYERS_ENDPOINT`, `MODELS_ENDPOINT`, `MATCHES_ENDPOINT`: The endpoints for different API resources.

#### Methods

1. **Get Requests**

   - `GetTeamByName(string name, Action<Team> callback)`: Get a team by its name.
   - `GetTeamByID(string id, Action<Team> callback)`: Get a team by its ID.
   - `GetAllTeams(Action<ArrayList> callback)`: Get all teams.
   - `GetUserByDiscordID(string discord_id, Action<Player> callback)`: Get a player by their Discord ID.
   - `GetUserByEpicID(string epic_id, Action<Player> callback)`: Get a player by their Epic ID.
   - `GetAllUsers(Action<ArrayList> callback)`: Get all players.
   - `GetModelByID(string id, Action<Model> callback)`: Get a model by its ID.
   - `GetModelsByTeamName(string name, Action<ArrayList> callback)`: Get all models belonging to a team by name.
   - `GetModelsByTeamID(string id, Action<ArrayList> callback)`: Get all models belonging to a team by ID.
   - `GetAllModels(Action<ArrayList> callback)`: Get all models.
   - `GetMatchByID(string id, Action<Match> callback)`: Get a match by its ID.
   - `GetMatchByTeamID(string id, Action<ArrayList> callback)`: Get all matches involving a team by ID.
   - `GetMatchByTeamName(string name, Action<ArrayList> callback)`: Get all matches involving a team by name.
   - `GetMatchesByModelID(string id, Action<ArrayList> callback)`: Get all matches using a specific model by ID.
   - `GetAllMatches(Action<ArrayList> callback)`: Get all matches.

2. **Delete Requests**

   - `DeleteTeamByID(string id)`: Delete a team by its ID.
   - `DeleteUserByID(string id)`: Delete a player by their ID.
   - `DeleteModelByID(string id)`: Delete a model by its ID.
   - `DeleteMatchByID(string id)`: Delete a match by its ID.

3. **Post Requests**

   - `CreateTeam(string name)`: Create a new team.
   - `CreateUser(string discord_id, string epic_id, string team_id, string name)`: Create a new player.
   - `CreateModel(string team_id, string name, string url)`: Create a new model.
   - `CreateMatch(string team_1, string team_1_model, string team_2, string team_2_model, string type, string timestamp, string team_1_score, string team_2_score, string winning_team_id, string winning_model_id)`: Create a new match.

4. **Put Requests**

   - `UpdateTeam(string id, string name)`: Update a team's name by its ID.
   - `UpdateUser(string id, string discord_id, string epic_id, string team_id, string name)`: Update a player's details by their ID.
   - `UpdateModel(string id, string team_id, string name, string url)`: Update a model's details by its ID.
   - `UpdateMatch(string id, string team_1, string team_1_model, string team_2, string team_2_model, string type, string timestamp, string team_1_score, string team_2_score, string winning_team_id, string winning_model_id)`: Update a match's details by its ID.

5. **Private Helper Methods**

   - `GetRequest(string endpoint, Action<string> callback)`: Helper method for performing a GET request.
   - `PostRequest(string endpoint, string data)`: Helper method for performing a POST request.
   - `PutRequest(string endpoint, string data)`: Helper method for performing a PUT request.
   - `DeleteRequest(string endpoint)`: Helper method for performing a DELETE request.

### Data Classes

The script also defines several data classes that are used for deserializing JSON responses from the API.

- `TeamResponse`: Represents a response containing an array of teams.
- `Team`: Represents a team with various properties like ID, name, users, models, and matches.
- `SmallTeam`: Represents a simplified team object used in Player data.
- `PlayerResponse`: Represents a response containing an array of players.
- `Player`: Represents a player with properties like ID, Discord ID, Epic ID, team ID, and name.
- `ModelResponse`: Represents a response containing an array of models.
- `Model`: Represents a model with properties like ID, team ID, name, and URL.
- `MatchResponse`: Represents a response containing an array of matches.
- `Match`: Represents a match with properties like ID, team 1, team 1 model, team 2, team 2 model, type, timestamp, team 1 score, team 2 score, winning team ID, and winning model ID.

## Usage

1. **Copy the file into your prroject** - Can be located wherever you want, as long as its in assets.
2. **Add it to any script as a component** - See below example
3. **Call whichever method you need** - You then have access to full CRUD ops to the database through unity.

**NOTE**: You must use a callback function to extract the data. See below examples.

```C#

    ap.<CRUD method>(<input params>, (Type variable) =>
    {
        Type neededValue = variable;

        Debub.Log(neededValue.<attribute>)
        //Plus any other logic you need it for
    });
```

### Example

```C#
using UnityEngine;

public class TestAPI : MonoBehaviour
{
    private MLApi api;
    void Start()
    {
        api = gameObject.AddComponent<MLApi>();

        api.GetTeamByName("Team_2_Name", (Team team) =>
        {
            Debug.Log("Team: " + team.id);
        });
    }
}
```

## Notes

- Make sure to replace the `URL` and `TOKEN` constants with the actual URL and authentication token provided by the API.

- Always handle errors appropriately when making API requests to ensure the smooth functioning of your game or application.
