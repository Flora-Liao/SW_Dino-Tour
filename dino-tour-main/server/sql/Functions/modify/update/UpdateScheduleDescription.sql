CREATE OR REPLACE FUNCTION UpdateScheduleDescription (
    UserId_p                INT,
    ScheduleId_p            INT,
    ScheduleDescription_p   TEXT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN
    IF (SELECT IsMember(UserId_p, ScheduleId_p))
    THEN
        UPDATE
            Schedules
        SET
            ScheduleDescription = ScheduleDescription_p
        WHERE
            ScheduleId = ScheduleId_p
        RETURNING ScheduleId INTO id
        ;
        RETURN id;
    END IF;
    RETURN -1;
END; 
$$ LANGUAGE plpgsql
;