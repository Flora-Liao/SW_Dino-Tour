CREATE OR REPLACE FUNCTION ListTags (
    ScheduleId_p                INT
)
RETURNS TABLE (
    TagId      INT
)
AS $$
BEGIN
    RETURN QUERY 
    SELECT 
        id
    FROM
        Tags
    WHERE
        ScheduleId = ScheduleId_p
    ORDER BY
        id
    ASC
    ;
END; 
$$ LANGUAGE plpgsql
;