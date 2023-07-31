SELECT
  "Team".id AS team_id,
  "Team".name,
  "Team".eq_elo,
  "Team".trained_elo,
  COALESCE(
    count(
      CASE
        WHEN ("TeamInEquationMatch".winner = TRUE) THEN 1
        ELSE NULL :: integer
      END
    ),
    (0) :: bigint
  ) AS eqmatcheswon,
  COALESCE(
    count(
      CASE
        WHEN ("TeamInEquationMatch".winner = false) THEN 1
        ELSE NULL :: integer
      END
    ),
    (0) :: bigint
  ) AS eqmatcheslost,
  COALESCE(count("TeamInEquationMatch".winner), (0) :: bigint) AS eqmatchesplayed
FROM
  (
    "Team"
    LEFT JOIN "TeamInEquationMatch" ON (("Team".id = "TeamInEquationMatch"."teamId"))
  )
GROUP BY
  "Team".id,
  "Team".name,
  "Team".eq_elo,
  "Team".trained_elo;