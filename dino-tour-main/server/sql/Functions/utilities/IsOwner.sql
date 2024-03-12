CREATE OR REPLACE FUNCTION IsOwner (
    UserId_p           INT,
    ScheduleId_p       INT
)
RETURNS BOOLEAN
AS $$
BEGIN
    IF EXISTS (
        SELECT
            *
        FROM
            Schedules
        WHERE
            OwnerId = UserId_p
            AND ScheduleId = ScheduleId_p
    ) THEN
        RETURN TRUE;
    END IF;
    
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql
;