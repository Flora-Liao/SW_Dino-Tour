CREATE OR REPLACE FUNCTION UpdateScheduleImage (
    UserId_p                    INT,
    ScheduleId_p                INT,
    ScheduleImage_p             TEXT
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
            ScheduleImage = ScheduleImage_p
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