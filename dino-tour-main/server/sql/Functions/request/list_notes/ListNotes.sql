CREATE OR REPLACE FUNCTION ListNotes (
    ScheduleId_p                INT
)
RETURNS TABLE (
    NoteId      INT
)
AS $$
BEGIN
    RETURN QUERY 
    SELECT 
        id
    FROM
        Notes
    WHERE
        ScheduleId = ScheduleId_p
    ORDER BY
        CreateTimeStamp
    ASC
    ;
END; 
$$ LANGUAGE plpgsql
;