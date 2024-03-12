CREATE OR REPLACE FUNCTION UpdateCredit (
    CreditId_p         INT,
    Stat_p             BOOLEAN
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN    
    UPDATE 
        Credits
    SET 
        Stat = Stat_p
    WHERE
        CreditId = CreditId_p
    RETURNING CreditId INTO id
    ;
    RETURN id;  
END; 
$$ LANGUAGE plpgsql
;