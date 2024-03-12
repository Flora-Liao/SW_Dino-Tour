CREATE OR REPLACE FUNCTION ToggleArchive (
    UserId_p           INT,
    ScheduleId_p       INT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN
    IF EXISTS (SELECT * FROM Archives WHERE UserId = UserId_p AND ScheduleId = ScheduleId_p)
    THEN
        DELETE FROM
            Archives
        WHERE
            UserId = UserId_p
            AND ScheduleId = ScheduleId_p
        RETURNING Archives.id INTO id
        ;
    ELSE
        INSERT INTO
            Archives (UserId, ScheduleId)
        VALUES
            (UserId_p, ScheduleId_p)
        RETURNING Archives.id INTO id
        ;
    END IF
    ;
    RETURN id;
END; 
$$ LANGUAGE plpgsql
;