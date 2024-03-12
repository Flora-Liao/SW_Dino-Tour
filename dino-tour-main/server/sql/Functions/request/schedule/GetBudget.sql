CREATE OR REPLACE FUNCTION GetBudget (
    UserId_p            INT,
    ScheduleId_p        INT
)
RETURNS INT
AS $$
DECLARE
    Budget_p INT;
BEGIN
    SELECT
        Budget
    INTO
        Budget_p
    FROM
        Members
    WHERE
        ScheduleId = ScheduleId_p
        AND UserId = UserId_p
    ;
    RETURN COALESCE(Budget, 0);
END; 
$$ LANGUAGE plpgsql
;