CREATE OR REPLACE FUNCTION DeleteEvent (
    EventId_p           INT
)
RETURNS INT
AS $$
DECLARE
    EventOnDay_p INT;
    EventOrder_p INT;
    ScheduleId_p INT;
    id INT;
BEGIN
    SELECT
        EventOnDay, EventOrder, ScheduleId
    INTO
        EventOnDay_p, EventOrder_p, ScheduleId_p
    FROM
        Events
    WHERE
        EventId = EventId_p
    ;
    UPDATE 
        Events
    SET
        EventOrder = EventOrder - 1
    WHERE
        EventOrder > EventOrder_p
        AND EventOnDay = EventOnDay_p
        AND ScheduleId = ScheduleId_p
    ;   
    DELETE FROM
        Events
    WHERE
        EventId = EventId_p
    RETURNING EventId INTO id
    ;
    RETURN id;
END; 
$$ LANGUAGE plpgsql
;