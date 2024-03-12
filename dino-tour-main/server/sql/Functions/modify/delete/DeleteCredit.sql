CREATE OR REPLACE FUNCTION DeleteCredit (
    CreditId_p         INT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN    
    DELETE FROM
        Credits
    WHERE
        CreditId = CreditId_p
    RETURNING CreditId INTO id
    ;
    RETURN id;
END; 
$$ LANGUAGE plpgsql
;