CREATE OR REPLACE FUNCTION UpdateUserBackgroundImage (
    UserId_p                    INT,
    UserBackgroundImage_p       TEXT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN
    UPDATE
        Users
    SET
        UserBackgroundImage = UserBackgroundImage_p
    WHERE
        UserId = UserId_p
    RETURNING UserId INTO id
    ;
    RETURN id;
END; 
$$ LANGUAGE plpgsql
;