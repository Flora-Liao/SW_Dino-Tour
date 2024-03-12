CREATE OR REPLACE FUNCTION GetPredictedCost (
    UserId_p            INT,
    ScheduleId_p        INT
)
RETURNS INT
AS $$
DECLARE
    PredictedCost INT;
BEGIN
    SELECT
        SUM(Cost)
    INTO
        PredictedCost
    FROM
        Events
    LEFT JOIN
        EventCosts
    ON
        Events.EventId = EventCosts.EventId
    WHERE
        EventCosts.Cost IS NOT NULL
        AND EventCosts.UserId = UserId_p
    ;
    RETURN COALESCE(PredictedCost,0);
END; 
$$ LANGUAGE plpgsql
;