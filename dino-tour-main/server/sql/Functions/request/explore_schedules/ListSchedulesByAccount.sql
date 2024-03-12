CREATE OR REPLACE FUNCTION ListSchedulesByAccount (
    UserAccount_p      TEXT
)
RETURNS TABLE (
    ScheduleId_o    INT
)
AS $$
DECLARE
    UserId_p INT;
BEGIN
    UserId_p = (SELECT Account2Id(UserAccount_p));

    RETURN QUERY 
    SELECT 
        ScheduleId
    FROM
        Schedules 
    WHERE
        OwnerId = UserId_p
        AND Public = TRUE
    ;
END; 
$$ LANGUAGE plpgsql
;