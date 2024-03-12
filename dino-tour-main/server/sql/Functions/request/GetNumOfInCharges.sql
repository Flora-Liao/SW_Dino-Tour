CREATE OR REPLACE FUNCTION GetNumOfInCharges (
    CreditId_p      INT
)
RETURNS INT
AS $$
DECLARE
    ret INT;
BEGIN
    SELECT
        COUNT(*)
    INTO
        ret
    FROM
        InCharges
    WHERE
        InCharges.CreditId = CreditId_p
    ;
    RETURN COALESCE(ret, 0);
END; 
$$ LANGUAGE plpgsql
;