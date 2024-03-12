CREATE OR REPLACE FUNCTION GetNumOfArchives (
    ScheduleId_p       INT
)
RETURNS INT
AS $$
DECLARE
    NumOfArchives INT;
BEGIN
    SELECT 
        COUNT(Archives.id)
    FROM
        Archives
    WHERE
        ScheduleId = ScheduleId_p
    INTO
        NumOfArchives
    ;
    RETURN COALESCE(NumOfArchives, 0);
END; 
$$ LANGUAGE plpgsql
;