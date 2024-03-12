CREATE OR REPLACE FUNCTION NewArchive (
    UserId_p           INT,
    ScheduleId_p       INT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN
    IF NOT (IsOwner(UserId_p, ScheduleId_p)) 
    THEN
        INSERT INTO 
            Archives(UserId, ScheduleId)
        VALUES 
            (UserId_p, ScheduleId_p)
        RETURNING Archives.id INTO id
        ;
        RETURN id;
    END IF;
    RETURN -1;
END; 
$$ LANGUAGE plpgsql
;