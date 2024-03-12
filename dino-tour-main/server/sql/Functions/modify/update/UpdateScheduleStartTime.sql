CREATE OR REPLACE FUNCTION UpdateScheduleStartTime (
    UserId_p           INT,
    ScheduleId_p       INT,
    OnDay_p            INT,
    StartTime_p        TIME
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN
    IF (SELECT IsMember(UserId_p, ScheduleId_p)) 
    THEN
        UPDATE
            ScheduleStartTimes
        SET
            StartTime = StartTime_p
        WHERE
            ScheduleId = ScheduleId_p
            AND OnDay = OnDay_p
        RETURNING ScheduleId INTO id
        ;
        RETURN id;
    END IF;
    RETURN -1;
END; 
$$ LANGUAGE plpgsql
;