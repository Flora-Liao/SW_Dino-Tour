CREATE OR REPLACE FUNCTION UpdateUserPhoto (
    UserId_p                INT,
    UserPhoto_p             TEXT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN
    UPDATE
        Users
    SET
        UserPhoto = UserPhoto_p
    WHERE
        UserId = UserId_p
    RETURNING UserId INTO id
    ;
    RETURN id;
END; 
$$ LANGUAGE plpgsql
;