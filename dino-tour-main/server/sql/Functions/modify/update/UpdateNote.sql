CREATE OR REPLACE FUNCTION UpdateNote (
    id_p               INT,
    Content_p          TEXT,
    Colour_p           TEXT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN
    UPDATE
        Notes
    SET
        Content = Content_p,
        Colour = Colour_p
    WHERE
        Notes.id = id_p
    RETURNING Notes.id INTO id;
    
    RETURN id;
END; 
$$ LANGUAGE plpgsql
;