CREATE OR REPLACE FUNCTION GetBudget(
    UserId_p            INT,
    ScheduleId_p        INT
)
RETURNS INT
AS $$
DECLARE
    ret INT;
BEGIN
    SELECT
        Budget
    INTO
        ret
    FROM
        Members
    WHERE
        ScheduleId = ScheduleId_p
        AND UserId = UserId_p
    ;
    RETURN COALESCE(ret, 0);
END; 
$$ LANGUAGE plpgsql
;