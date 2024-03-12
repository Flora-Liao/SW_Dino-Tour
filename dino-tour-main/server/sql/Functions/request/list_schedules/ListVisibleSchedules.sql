CREATE OR REPLACE FUNCTION ListVisibleSchedules (
    UserId_p            INT
)
RETURNS TABLE (
    ScheduleId_o    INT
)
AS $$
BEGIN
    RETURN QUERY 
    SELECT 
        Schedules.ScheduleId
    FROM
        Schedules 
    JOIN
        Members
    ON 
        Schedules.ScheduleId = Members.ScheduleId
    WHERE
        Members.UserId = UserId_p
    ;
END; 
$$ LANGUAGE plpgsql
;