CREATE OR REPLACE FUNCTION UpdateUserDescription (
    UserId_p           INT,
    UserDescription_p  TEXT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN
    UPDATE
        Users
    SET
        UserDescription = UserDescription_p
    WHERE
        UserId = UserId_p
    RETURNING UserId INTO id
    ;
    RETURN id;
END; 
$$ LANGUAGE plpgsql
;