CREATE OR REPLACE FUNCTION DeleteTag (
    id_p                INT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN    
    DELETE FROM
        Tags
    WHERE
        Tags.id = id_p
    RETURNING Tags.id INTO id
    ;
    RETURN id;
END; 
$$ LANGUAGE plpgsql
;