CREATE OR REPLACE FUNCTION DeleteArchive (
    UserId_p           INT,
    ScheduleId_p       INT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN
    DELETE FROM
        Archives
    WHERE
        UserId = UserId_p
        AND ScheduleId = ScheduleId_p
    RETURNING Archives.id INTO id
    ;
    RETURN id;
END; 
$$ LANGUAGE plpgsql
;