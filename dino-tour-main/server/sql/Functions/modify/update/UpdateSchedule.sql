CREATE OR REPLACE FUNCTION UpdateSchedule (
    UserId_p           INT,
    ScheduleId_p       INT,
    ScheduleName_p     TEXT,
    StartDate_p        DATE,
    EndDate_p          DATE,
    Public_p           BOOLEAN
)
RETURNS INT
AS $$
DECLARE 
    id INT;
    D INT;
    NumOfDays INT;
BEGIN
    IF (SELECT IsMember(UserId_p, ScheduleId_p)) 
    THEN
        UPDATE
            Schedules
        SET
            ScheduleName = ScheduleName_p,
            StartDate = StartDate_p,
            EndDate = EndDate_p,
            Public = Public_p
        WHERE
            ScheduleId = ScheduleId_p
        RETURNING ScheduleId INTO id
        ;
        /*
        Deleting Days that are out of bound
        */
        NumOfDays = (SELECT EndDate_p - StartDate_p);
        DELETE FROM
            ScheduleStartTimes
        WHERE
            ScheduleId = ScheduleId_p
            AND OnDay > NumOfDays
        ;
        DELETE FROM
            Events
        WHERE
            ScheduleId = ScheduleId_p
            AND EventOnDay > NumOfDays
        ;
        /*
        Create new StartTimes (Doesn't matter creating repeated records, keyword unique will handle this for us)
        */
        FOR D IN 1..NumOfDays
        LOOP
            INSERT INTO
                ScheduleStartTimes (ScheduleId, OnDay, StartTime)
            VALUES
                (ScheduleId_p, D, '08:00:00')
            ;
        END LOOP;
        RETURN id;
    END IF;
    RETURN -1;
END; 
$$ LANGUAGE plpgsql
;