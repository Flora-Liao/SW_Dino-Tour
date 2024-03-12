CREATE OR REPLACE FUNCTION ToggleVote (
    UserId_p           INT,
    ScheduleId_p       INT,
    Vote_p             TEXT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN
    IF EXISTS (SELECT * FROM Votes WHERE UserId = UserId_p AND ScheduleId = ScheduleId_p AND Vote = Vote_p)
    THEN
        DELETE FROM
            Votes
        WHERE
            UserId = UserId_p
            AND ScheduleId = ScheduleId_p
            AND Vote = Vote_p
        RETURNING Votes.id INTO id
        ;
    ELSE
        INSERT INTO
            Votes (UserId, ScheduleId, Vote, Stamp)
        VALUES
            (UserId_p, ScheduleId_p, Vote_p, current_timestamp)
        RETURNING Votes.id INTO id
        ;
    END IF
    ;
    RETURN id;
END; 
$$ LANGUAGE plpgsql
;