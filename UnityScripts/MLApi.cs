using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using System;

public class MLApi : MonoBehaviour
{
    // Start is called before the first frame update    


    private const string URL = "https://mlapi.xancorp.us";


    private const string TOKEN = "4ae10c3a-79f9-4cd2-aeae-ba0fd5f0f7a3";

    private const string TEAMS_ENDPOINT = "/teams";
    private const string PLAYERS_ENDPOINT = "/players";
    private const string MATCHES_ENDPOINT = "/matches";
    private const string MODELS_ENDPOINT = "/models";



    //Get requests
    public void GetTeamByName(string name, Action<Team> callback)
    {
        StartCoroutine(GetRequest($"{TEAMS_ENDPOINT}?name={name}", (string response) =>
        {
            Team team = JsonUtility.FromJson<Team>(response);
            callback.Invoke(team);
        }));
    }
    public void GetTeamByID(string id, Action<Team> callback)
    {
        StartCoroutine(GetRequest($"{TEAMS_ENDPOINT}/{id}", (string response) =>
        {
            Team team = JsonUtility.FromJson<Team>(response);
            callback.Invoke(team);
        }));
    }

    public void GetAllTeams(Action<ArrayList> callback)

    {
        StartCoroutine(GetRequest($"{TEAMS_ENDPOINT}", (string response) =>
        {
            TeamResponse teamResponse = JsonUtility.FromJson<TeamResponse>(response);
            ArrayList teams = new();


            // Debug.Log(teamResponse);
            foreach (Team team in teamResponse.teams)
            {

                teams.Add(team);
            }
            callback.Invoke(teams);


        }));
    }

    public void GetUserByDiscordID(string discord_id, Action<Player> callback)
    {
        StartCoroutine(GetRequest($"{PLAYERS_ENDPOINT}?discord_id={discord_id}", (string response) =>
        {
            Player player = JsonUtility.FromJson<Player>(response);
            callback.Invoke(player);
        }));

    }

    public void GetUserByEpicID(string epic_id, Action<Player> callback)
    {
        StartCoroutine(GetRequest($"{PLAYERS_ENDPOINT}?epic_id={epic_id}", (string response) =>
        {
            Player player = JsonUtility.FromJson<Player>(response);
            callback.Invoke(player);
        }));

    }

    public void GetAllUsers(Action<ArrayList> callback)
    {
        StartCoroutine(GetRequest($"{PLAYERS_ENDPOINT}", (string response) =>
        {
            ArrayList players = new();
            PlayerResponse playerResponse = JsonUtility.FromJson<PlayerResponse>(response);

            foreach (Player player in playerResponse.players)
            {
                players.Add(player);
            }
            callback.Invoke(players);

        }));
    }

    public void GetModelByID(string id, Action<Model> callback)
    {
        StartCoroutine(GetRequest($"{MODELS_ENDPOINT}/{id}", (string response) =>
        {
            Model model = JsonUtility.FromJson<Model>(response);
            callback.Invoke(model);
        }));
    }

    public void GetModelsByTeamName(string name, Action<ArrayList> callback)
    {
        StartCoroutine(GetRequest($"{MODELS_ENDPOINT}?team_name={name}", (string response) =>
        {
            ArrayList models = new();
            ModelResponse modelResponse = JsonUtility.FromJson<ModelResponse>(response);

            foreach (Model model in modelResponse.models)
            {
                models.Add(model);
            }
            callback.Invoke(models);

        }));
    }

    public void GetModelsByTeamID(string id, Action<ArrayList> callback)
    {
        StartCoroutine(GetRequest($"{MODELS_ENDPOINT}?team_id={id}", (string response) =>
        {
            ArrayList models = new();
            ModelResponse modelResponse = JsonUtility.FromJson<ModelResponse>(response);

            foreach (Model model in modelResponse.models)
            {
                models.Add(model);
            }
            callback.Invoke(models);

        }));
    }

    public void GetAllModels(Action<ArrayList> callback)
    {
        StartCoroutine(GetRequest($"{MODELS_ENDPOINT}", (string response) =>
        {
            ArrayList models = new();
            ModelResponse modelResponse = JsonUtility.FromJson<ModelResponse>(response);

            foreach (Model model in modelResponse.models)
            {
                models.Add(model);
            }
            callback.Invoke(models);

        }));
    }

    public void GetMatchByID(string id, Action<Match> callback)
    {
        StartCoroutine(GetRequest($"{MATCHES_ENDPOINT}/{id}", (string response) =>
        {
            Match match = JsonUtility.FromJson<Match>(response);
            callback.Invoke(match);
        }));
    }

    public void GetMatchByTeamID(string id, Action<ArrayList> callback)
    {
        StartCoroutine(GetRequest($"{MATCHES_ENDPOINT}?team_id={id}", (string response) =>
        {
            ArrayList matches = new();
            MatchResponse matchResponse = JsonUtility.FromJson<MatchResponse>(response);

            foreach (Match match in matchResponse.matches)
            {
                matches.Add(match);
            }
            callback.Invoke(matches);

        }));
    }

    public void GetMatchByTeamName(string name, Action<ArrayList> callback)
    {
        StartCoroutine(GetRequest($"{MATCHES_ENDPOINT}?team_name={name}", (string response) =>
        {
            ArrayList matches = new();
            MatchResponse matchResponse = JsonUtility.FromJson<MatchResponse>(response);

            foreach (Match match in matchResponse.matches)
            {
                matches.Add(match);
            }
            callback.Invoke(matches);

        }));
    }

    public void GetMatchesByModelID(string id, Action<ArrayList> callback)
    {
        StartCoroutine(GetRequest($"{MATCHES_ENDPOINT}?model_id={id}", (string response) =>
        {
            ArrayList matches = new();
            MatchResponse matchResponse = JsonUtility.FromJson<MatchResponse>(response);

            foreach (Match match in matchResponse.matches)
            {
                matches.Add(match);
            }
            callback.Invoke(matches);

        }));
    }

    public void GetAllMatches(Action<ArrayList> callback)
    {
        StartCoroutine(GetRequest($"{MATCHES_ENDPOINT}", (string response) =>
        {
            ArrayList matches = new();
            MatchResponse matchResponse = JsonUtility.FromJson<MatchResponse>(response);

            foreach (Match match in matchResponse.matches)
            {
                matches.Add(match);
            }
            callback.Invoke(matches);

        }));
    }

    //Delete requests

    public void DeleteTeamByID(string id)
    {
        StartCoroutine(DeleteRequest($"{TEAMS_ENDPOINT}/{id}"));
    }

    public void DeleteUserByID(string id)
    {
        StartCoroutine(DeleteRequest($"{PLAYERS_ENDPOINT}/{id}"));
    }
    public void DeleteModelByID(string id)
    {
        StartCoroutine(DeleteRequest($"{MODELS_ENDPOINT}/{id}"));
    }
    public void DeleteMatchByID(string id)
    {
        StartCoroutine(DeleteRequest($"{MATCHES_ENDPOINT}/{id}"));
    }

    //Post requests
    public void CreateTeam(string name)
    {
        StartCoroutine(PostRequest($"{TEAMS_ENDPOINT}", $"name={name}"));
    }

    public void CreateUser(string discord_id, string epic_id, string team_id, string name)
    {
        StartCoroutine(PostRequest($"{PLAYERS_ENDPOINT}", $"discord_id={discord_id}&epic_id={epic_id}&team_id={team_id}&name={name}"));
    }

    public void CreateModel(string team_id, string name, string url)
    {
        StartCoroutine(PostRequest($"{MODELS_ENDPOINT}", $"team_id={team_id}&name={name}&url={url}"));
    }
    public void CreateMatch(string team_1, string team_1_model, string team_2, string team_2_model, string type, string timestamp, string team_1_score, string team_2_score, string winning_team_id, string winning_model_id)
    {
        StartCoroutine(PostRequest($"{MATCHES_ENDPOINT}", $"team_1={team_1}&team_1_model={team_1_model}&team_2={team_2}&team_2_model={team_2_model}&type={type}&timestamp={timestamp}&team_1_score={team_1_score}&team_2_score={team_2_score}&winning_team_id={winning_team_id}&winning_model_id={winning_model_id}"));
    }
    //Put requests
    public void UpdateTeam(string id, string name)
    {
        StartCoroutine(PutRequest($"{TEAMS_ENDPOINT}/{id}", $"name={name}"));
    }

    public void UpdateUser(string id, string discord_id, string epic_id, string team_id, string name)
    {
        StartCoroutine(PutRequest($"{PLAYERS_ENDPOINT}/{id}", $"discord_id={discord_id}&epic_id={epic_id}&team_id={team_id}&name={name}"));
    }

    public void UpdateModel(string id, string team_id, string name, string url)
    {
        StartCoroutine(PutRequest($"{MODELS_ENDPOINT}/{id}", $"team_id={team_id}&name={name}&url={url}"));
    }

    public void UpdateMatch(string id, string team_1, string team_1_model, string team_2, string team_2_model, string type, string timestamp, string team_1_score, string team_2_score, string winning_team_id, string winning_model_id)
    {
        StartCoroutine(PutRequest($"{MATCHES_ENDPOINT}/{id}", $"team_1={team_1}&team_1_model={team_1_model}&team_2={team_2}&team_2_model={team_2_model}&type={type}&timestamp={timestamp}&team_1_score={team_1_score}&team_2_score={team_2_score}&winning_team_id={winning_team_id}&winning_model_id={winning_model_id}"));
    }


    private IEnumerator GetRequest(string endpoint, Action<string> callback)
    {
        UnityWebRequest request = UnityWebRequest.Get(URL + endpoint);
        // Debug.Log(URL + endpoint);
        request.SetRequestHeader("token", TOKEN);
        yield return request.SendWebRequest();
        if (request.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError(request.error);
            callback.Invoke(null);
        }
        else
        {
            callback.Invoke(request.downloadHandler.text);
            // Debug.Log(request.downloadHandler.text);
        }
    }

    private IEnumerator PostRequest(string endpoint, string data)
    {
        UnityWebRequest request = UnityWebRequest.PostWwwForm(URL + endpoint, data);
        request.SetRequestHeader("token", TOKEN);
        yield return request.SendWebRequest();

        if (request.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError("Error: " + request.error);

        }
        else
        {
            Debug.Log("Post request successful!");
            Debug.Log(request.downloadHandler.text);
        }


    }
    private IEnumerator PutRequest(string endpoint, string data)
    {
        UnityWebRequest request = UnityWebRequest.Put(URL + endpoint, data);
        request.SetRequestHeader("token", TOKEN);
        yield return request.SendWebRequest();

        if (request.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError("Error: " + request.error);

        }
        else
        {
            Debug.Log("Put request successful!");
            Debug.Log(request.downloadHandler.text);
        }
    }

    private IEnumerator DeleteRequest(string endpoint)
    {
        UnityWebRequest request = UnityWebRequest.Delete(URL + endpoint);
        request.SetRequestHeader("token", TOKEN);
        yield return request.SendWebRequest();

        if (request.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError("Error: " + request.error);

        }
        else
        {
            Debug.Log("Delete request successful!");
            Debug.Log(request.downloadHandler.text);
        }
    }
}

[System.Serializable]

public class TeamResponse
{
    public Team[] teams;
}

[System.Serializable]
public class Team
{
    public string id;
    public string name;
    public Player[] users;
    public Model[] models;
    public Match[] matchesAsTeam1;
    public Match[] matchesAsTeam2;
    public Match[] matchesAsWinningModel;

}

[System.Serializable]
public class SmallTeam
{
    public string id;
    public string name;
}

[System.Serializable]
public class PlayerResponse
{
    public Player[] players;
}

[System.Serializable]

public class Player
{
    public string id;
    public string discord_id;
    public string epic_id;
    public string team_id;
    public string name;
    public SmallTeam team;
}

[System.Serializable]
public class ModelResponse
{
    public Model[] models;
}

[System.Serializable]

public class Model
{
    public string id;
    public string team_id;
    public string name;
    public string url;
}

[System.Serializable]

public class MatchResponse
{
    public Match[] matches;
}

[System.Serializable]

public class Match
{
    public string id;
    public string team_1;
    public string team_1_model;
    public string team_2;
    public string team_2_model;
    public string type;
    public string timestamp;
    public string team_1_score;
    public string team_2_score;
    public string winning_team_id;
    public string winning_model_id;
}