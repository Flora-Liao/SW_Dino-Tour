CREATE OR REPLACE FUNCTION ListOwnedSchedules (
    UserId_p                INT
)
RETURNS TABLE (
    ScheduleId_o    INT
)
AS $$
BEGIN
    RETURN QUERY 
    SELECT 
        ScheduleId
    FROM
        Schedules AS s
    WHERE
        s.ownerid = UserId_p
    ;
END; 
$$ LANGUAGE plpgsql
;