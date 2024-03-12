CREATE OR REPLACE FUNCTION ListArchivedSchedules (
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
        Archives
    ON 
        Schedules.ScheduleId = Archives.ScheduleId
    WHERE
        Archives.UserId = UserId_p
    ;
END; 
$$ LANGUAGE plpgsql
;