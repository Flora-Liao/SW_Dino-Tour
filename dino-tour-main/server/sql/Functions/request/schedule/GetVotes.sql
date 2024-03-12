CREATE OR REPLACE FUNCTION GetVotes (
    ScheduleId_p        INT,
    Vote_p              TEXT
)
RETURNS INT
AS $$
DECLARE
    ret         INT;
BEGIN
    SELECT
        COUNT(*)
    INTO
        ret
    FROM
        Votes
    WHERE
        ScheduleId = ScheduleId_p
        AND
        (Vote_p = '' OR Vote_p = Vote)
    ;
    RETURN COALESCE(ret, 0);
END; 
$$ LANGUAGE plpgsql
;