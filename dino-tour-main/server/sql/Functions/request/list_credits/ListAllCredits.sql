CREATE OR REPLACE FUNCTION ListAllCredits (
    ScheduleId_p       INT
)
RETURNS TABLE (
    CreditId_o  INT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
        CreditId
    FROM
        Credits
    WHERE
        ScheduleId = ScheduleId_p
    ORDER BY
        CreateDate
    ASC
    ;
END; 
$$ LANGUAGE plpgsql
;