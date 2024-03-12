CREATE OR REPLACE FUNCTION NewVote (
    UserId_p           INT,
    ScheduleId_p       INT,
    Vote_p             TEXT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN    
    INSERT INTO
        Votes (UserId, ScheduleId, Vote, Stamp)
    VALUES
        (UserId_p, ScheduleId_p, Vote_p, current_timestamp)
    RETURNING Votes.id INTO id
    ;
    
    RETURN id;
END; 
$$ LANGUAGE plpgsql
;