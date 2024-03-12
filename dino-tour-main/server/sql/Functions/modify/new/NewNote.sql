CREATE OR REPLACE FUNCTION NewNote (
    UserId_p           INT,
    ScheduleId_p       INT,
    Content_p          TEXT,
    Colour_p           TEXT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN
    IF (SELECT IsMember(UserId_p, ScheduleId_p))
    THEN
        INSERT INTO 
            Notes (ScheduleId, UserId, Content, Colour, CreateTimeStamp) 
        VALUES 
            (ScheduleId_p, UserId_p, Content_p, Colour_p, current_timestamp)
        RETURNING Notes.id INTO id
        ;
        RETURN id;
    END IF;
    RETURN -1;
END; 
$$ LANGUAGE plpgsql
;