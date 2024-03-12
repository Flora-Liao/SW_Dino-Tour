/*
Transform UserAccount to UserId
*/
CREATE OR REPLACE FUNCTION Account2Id (
    UserAccount_p      VARCHAR(20)
)
RETURNS INT
AS $$
DECLARE
    id INT;
BEGIN
    SELECT 
        UserId INTO id 
    FROM 
        Users 
    WHERE 
        UserAccount = UserAccount_p
    ;
    RETURN id;
END; 
$$ LANGUAGE plpgsql
;