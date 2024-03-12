/*
Transform UserId to UserAccount
*/
CREATE OR REPLACE FUNCTION Id2Account (
    UserId_p        INT
)
RETURNS VARCHAR(20)
AS $$
DECLARE
    Account VARCHAR(20);
BEGIN
    SELECT 
        UserAccount
    INTO
        Account
    FROM 
        Users 
    WHERE 
        UserId = UserId_p
    ;
    RETURN Account;
END; 
$$ LANGUAGE plpgsql
;