CREATE OR REPLACE FUNCTION DeleteVote (
    UserId_p           INT,
    ScheduleId_p       INT,
    Vote_p             TEXT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN    
    DELETE FROM
        Votes
    WHERE
        UserId = UserId_p
        AND ScheduleId = ScheduleId_p
        AND Vote = Vote_p
    RETURNING Votes.id INTO id
    ;
    RETURN id;
END; 
$$ LANGUAGE plpgsql
;