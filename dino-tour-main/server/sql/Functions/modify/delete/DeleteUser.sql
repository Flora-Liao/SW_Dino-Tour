CREATE OR REPLACE FUNCTION DeleteUser (
    UserId_p           INT
)
RETURNS INT
AS $$
DECLARE
    id INT;
BEGIN
    DELETE FROM
        Users
    WHERE
        UserId = UserId_p
    RETURNING UserId INTO id
    ;
    RETURN id;
END; $$
LANGUAGE plpgsql
;