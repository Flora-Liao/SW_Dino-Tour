CREATE OR REPLACE FUNCTION GetSumOfDebt (
    UserId_p                INT,
    ViewingAccount_p        TEXT,
    ScheduleId_p            INT
)
RETURNS INT
AS $$
DECLARE
    Payed INT;
    Owed INT;
    ViewingId_p INT;
BEGIN
    ViewingId_p = (SELECT Account2Id(ViewingAccount_p));
    SELECT
        SUM(Amount / GetNumOfInCharges(Credits.CreditId))
    INTO
        Payed
    FROM
        Credits
    WHERE
        Credits.ScheduleId = ScheduleId_p
        AND Credits.UserId = UserId_p
        AND
        EXISTS (
            SELECT * FROM InCharges WHERE InCharges.UserId = ViewingId_p AND InCharges.CreditId = Credits.CreditId
        )
    ;
    SELECT
        SUM(Amount / GetNumOfInCharges(Credits.CreditId))
    INTO
        Owed
    FROM
        Credits
    WHERE
        Credits.ScheduleId = ScheduleId_p
        AND Credits.UserId = ViewingId_p
        AND
        EXISTS (
            SELECT * FROM INCharges WHERE InCharges.UserId = UserId_p AND InCharges.CreditId = Credits.CreditId
        )
    ;
    RETURN COALESCE(Owed, 0) - COALESCE(Payed, 0);
END; 
$$ LANGUAGE plpgsql
;
