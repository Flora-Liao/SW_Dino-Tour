CREATE OR REPLACE FUNCTION DeleteSchedule (
    UserId_p           INT,
    ScheduleId_p       INT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN
    IF (SELECT IsOwner(UserId_p, ScheduleId_p))
    THEN
        DELETE FROM
            Schedules
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