CREATE OR REPLACE FUNCTION Login (
    UserAccount_p      VARCHAR(20),
    UserPassword_p     VARCHAR(20)
)
RETURNS INT
AS $$
DECLARE
    id INT;
BEGIN
    IF NOT EXISTS (SELECT * FROM Users WHERE UserAccount = UserAccount_p) 
    THEN
        RETURN -1;
    END IF;
    SELECT
        UserId
    FROM
        Users
    WHERE
        UserAccount = UserAccount_p
        AND UserPassword = UserPassword_p
    INTO
        id
    ;
    RETURN COALESCE(id, -2);
END; 
$$ LANGUAGE plpgsql
;