CREATE OR REPLACE FUNCTION GetRank(
    UserAccount_p       TEXT,
    Vote_p              TEXT
)
RETURNS INT
AS $$
DECLARE
    UserId_p    INT;
    ret INT;
BEGIN
    UserId_p = (SELECT Account2Id(UserAccount_p));
    SELECT
        SUM(GetVotes(ScheduleId, Vote_p))
    INTO
        ret
    FROM
        Schedules
    WHERE
        OwnerId = UserId_p
    ;
    RETURN COALESCE(ret, 0);
END; 
$$ LANGUAGE plpgsql
;