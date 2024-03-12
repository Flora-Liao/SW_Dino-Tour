CREATE OR REPLACE FUNCTION ListUsersByAccount (
    KeyWord             TEXT
)
RETURNS TABLE (
    UserAccount_o       TEXT
)
AS $$
BEGIN
    RETURN QUERY 
    SELECT 
        UserAccount
    FROM
        Users
    WHERE
        UserAccount ILIKE FORMAT('%%%s%%',Keyword)
    ;
END; 
$$ LANGUAGE plpgsql
;