CREATE OR REPLACE FUNCTION GetNumOfPublicSchedules (
    UserAccount_p      TEXT
)
RETURNS INT
AS $$
DECLARE
    UserId_p INT;
    NumOfPublicSchedules INT;
BEGIN
    UserId_p = (SELECT Account2Id(UserAccount_p));

    SELECT 
        COUNT(ScheduleId)
    FROM
        Users
    LEFT JOIN
        Schedules
    ON
        Users.UserId = Schedules.OwnerId
    GROUP BY
        Users.UserId
    HAVING
        Users.UserId = UserId_p
    INTO
        NumOfPublicSchedules
    ;
    RETURN COALESCE(NumOfPublicSchedules, 0);
END; 
$$ LANGUAGE plpgsql
;