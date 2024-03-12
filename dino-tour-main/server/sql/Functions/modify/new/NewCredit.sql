CREATE OR REPLACE FUNCTION NewCredit (
    ScheduleId_p        INT,
    PayerId_p           INT,
    Amount_p            INT,
    Description_p       TEXT,
    InCharge_p          TEXT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
    InChargeId INT;
    r RECORD;
BEGIN    
    INSERT INTO
        Credits (ScheduleId, UserId, Amount, Stat, Description, CreateDate)
    VALUES
        (ScheduleId_p, PayerId_p, Amount_p, FALSE, Description_p, current_date)
    RETURNING Credits.CreditId INTO id
    ;
    
    FOR r IN
        SELECT unnest(
            string_to_array(InCharge_p, ',')
        ) AS InChargeAccount
    LOOP
        InChargeId = (SELECT Account2Id(r.InChargeAccount));

        INSERT INTO
            InCharges (UserId, CreditId)
        VALUES
            (InChargeId, id)
        ;
    END LOOP
    ;

    RETURN id;
END; 
$$ LANGUAGE plpgsql
;