CREATE OR REPLACE FUNCTION DeleteEventsOnDay (
    UserId_p                INT,
    ScheduleId_p            INT,
    EventOnDay_p            INT
)
RETURNS INT
AS $$
DECLARE
    id INT;
BEGIN
    IF (SELECT IsMember(UserId_p, ScheduleId_p))
    THEN
        DELETE FROM
            Events
        WHERE
            ScheduleId = ScheduleId_p
            AND EventOnDay = EventOnDay_p
        RETURNING EventId INTO id
        ;
        RETURN id;
    END IF;
    RETURN -1;
END; 
$$ LANGUAGE plpgsql
;