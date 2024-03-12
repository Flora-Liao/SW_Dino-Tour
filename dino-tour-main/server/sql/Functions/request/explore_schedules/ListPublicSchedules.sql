/*
Vote_p = {'Economic', 'Delicious', 'Popular', ''}, '' would compare by sum of all votes
*/
CREATE OR REPLACE FUNCTION ListPublicSchedules (
    KeyWord            TEXT,
    Vote_p             TEXT
)
RETURNS TABLE (
    ScheduleId_o    INT
)
AS $$
BEGIN
    RETURN QUERY 
    SELECT 
        Schedules.ScheduleId
    FROM
        Schedules 
    LEFT JOIN 
        Votes
    ON 
        Schedules.ScheduleId = Votes.ScheduleId
        AND (Vote_p = '' OR Votes.Vote = Vote_p)
        AND (KeyWord = '' OR ScheduleName ILIKE FORMAT('%%%s%%', KeyWord))
    WHERE
        Schedules.Public = TRUE
    GROUP BY 
        Schedules.ScheduleId
    ORDER BY 
        COUNT(Votes.id)
    DESC
    ;
END; 
$$ LANGUAGE plpgsql
;