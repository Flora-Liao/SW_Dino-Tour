CREATE OR REPLACE FUNCTION IsCleanedUp (
    UserId_p                INT,
    ScheduleId_p            INT
)
RETURNS BOOLEAN
AS $$
DECLARE
    Payed INT;
    Owed INT;
    ViewingId_p INT;
BEGIN
    RETURN EXISTS (SELECT
        GetSumOfDebt(UserId_p, Id2Account(Members.UserId), ScheduleId_p)
    FROM
        Members
    WHERE
        Members.ScheduleId = ScheduleId_p
        AND NOT GetSumOfDebt(UserId_p, Id2Account(Members.UserId), ScheduleId_p) = 0
    );
END; 
$$ LANGUAGE plpgsql
;
