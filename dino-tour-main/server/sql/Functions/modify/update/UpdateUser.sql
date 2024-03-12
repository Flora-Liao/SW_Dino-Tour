CREATE OR REPLACE FUNCTION UpdateUser (
    UserId_p           INT,
    UserName_p         TEXT,
    UserPassword_p     TEXT
)
RETURNS INT
AS $$
DECLARE
    id INT;
BEGIN
    UPDATE 
        Users
    SET
        UserName = UserName_p,
        UserPassword = UserPassword_p
    WHERE
        UserId = UserId_p
    RETURNING UserId INTO id
    ;

    RETURN id;
END; 
$$ LANGUAGE plpgsql
;