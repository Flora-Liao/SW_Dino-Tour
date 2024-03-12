CREATE OR REPLACE FUNCTION NewEvent (
    UserId_p            INT,
    ScheduleId_p        INT,
    EventOnDay_p        INT,
    EventOrder_p        INT,
    StayTime_p          TIME,
    EventName_p         TEXT,
    EventPhoto_p        TEXT,
    Info_p              TEXT,
    Traffic_p           TEXT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN
    --RAISE NOTICE '%, %, %', EventOnDay_p, EventOrder_p, ScheduleId_p; 
    IF (SELECT IsMember(UserId_p, ScheduleId_p))
    THEN
        UPDATE
            Events
        SET
            EventOrder = EventOrder + 1
        WHERE
            EventOrder >= EventOrder_p
            AND ScheduleId = ScheduleId_p
            AND EventOnDay = EventOnDay_p
        ;
        INSERT INTO 
            Events (ScheduleId, EventOnDay, EventOrder, StayTime, EventName, EventPhoto, Info, Traffic) 
        VALUES 
            (ScheduleId_p, EventOnDay_p, EventOrder_p, StayTime_p, EventName_p, EventPhoto_p, Info_p, Traffic_p)
        RETURNING Events.EventId INTO id
        ;
        RETURN id;
    END IF;
    RETURN -1;
END; 
$$ LANGUAGE plpgsql
;