CREATE OR REPLACE FUNCTION GetNumOfScheduleArchived (
    UserAccount_p      TEXT
)
RETURNS INT
AS $$
DECLARE
    UserId_p INT;
    NumOfScheduleArchived INT;
BEGIN
    UserId_p = (SELECT Account2Id(UserAccount_p));
    
    SELECT
        COUNT(*)
    INTO 
        NumOfScheduleArchived
    FROM
        Archives
    JOIN
        Schedules
    ON
        Schedules.ScheduleId = Archives.ScheduleId
    WHERE
        Schedules.OwnerId = UserId_p
    ;
    RETURN COALESCE(NumOfScheduleArchived, 0);
END; 
$$ LANGUAGE plpgsql
;