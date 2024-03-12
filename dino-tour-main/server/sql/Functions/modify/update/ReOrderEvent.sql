CREATE OR REPLACE FUNCTION ReOrderEvent (
    EventId_p          INT,
    EventOrder_p       INT
)
RETURNS INT
AS $$
DECLARE
    OriginalEventOrder INT;
    ScheduleId_p INT;
    id INT;
BEGIN
    SELECT
        EventOrder, ScheduleId
    INTO
        OriginalEventOrder, ScheduleId_p
    FROM
        Events
    WHERE
        EventId = EventId_p
    ;
    IF (OriginalEventOrder < EventOrder_p)
    THEN
        UPDATE
            Events
        SET
            EventOrder = EventOrder - 1
        WHERE
            ScheduleId = ScheduleId_p
            AND EventOrder > OriginalEventOrder
            AND EventOrder <= EventOrder_p
        ;
    ELSE
        UPDATE
            Events
        SET
            EventOrder = EventOrder+1
        WHERE
            ScheduleId = ScheduleId_p
            ANd EventOrder < OriginalEventOrder
            AND EventOrder >= EventOrder_p
        ;
    END IF;
    UPDATE 
        Events
    SET
        EventOrder = EventOrder_p
    WHERE
        EventId = EventId_p
    ;
    RETURN EventOrder_p;
END; 
$$ LANGUAGE plpgsql
;