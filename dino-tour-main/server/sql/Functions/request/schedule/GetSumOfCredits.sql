CREATE OR REPLACE FUNCTION GetSumOfCredits (
    UserAccount_p      TEXT,
    ScheduleId_p       INT
)
RETURNS INT
AS $$
DECLARE
    UserId_p INT;
    SumOfCredits INT;
BEGIN
    UserId_p = (SELECT Account2Id(UserAccount_p));
    
    SELECT 
        SUM(Credits.Amount)
    FROM
        Credits
    WHERE
        Credits.UserId = UserId_p
        AND Credits.ScheduleId = ScheduleId_p
        AND Credits.Stat = FALSE
    INTO SumOfCredits
    ;
    RETURN COALESCE(SumOfCredits, 0);
END; 
$$ LANGUAGE plpgsql
;