CREATE OR REPLACE FUNCTION DeleteNote (
    id_p               INT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN
    DELETE FROM
        Notes
    WHERE
        Notes.id = id_p
    RETURNING Notes.id INTO id
    ;
    RETURN id;
END; 
$$ LANGUAGE plpgsql
;