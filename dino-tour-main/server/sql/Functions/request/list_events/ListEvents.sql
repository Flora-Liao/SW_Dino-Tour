CREATE OR REPLACE FUNCTION ListEvents (
    UserId_p            INT,
    ScheduleId_p        INT
)
RETURNS TABLE (
    EventId             INT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        Events.EventId
    FROM
        Events
    LEFT JOIN
        EventCosts
    ON
        Events.EventId = EventCosts.EventId
    WHERE
        Events.ScheduleId = ScheduleId_p
        AND (EventCosts.UserId = UserId_p 
             OR EventCosts.UserId IS NULL)
    ORDER BY
        (EventOnDay, EventOrder)
    ASC
    ;
END; 
$$ LANGUAGE plpgsql
;