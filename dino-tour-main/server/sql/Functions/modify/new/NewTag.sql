CREATE OR REPLACE FUNCTION NewTag (
    UserId_p            INT,
    ScheduleId_p        INT,
    Tag_p               TEXT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN    
    IF (SELECT IsMember(UserId_p, ScheduleId_p))
    THEN
        INSERT INTO
            Tags (ScheduleId, Tag)
        VALUES
            (ScheduleId_p, Tag_p)
        RETURNING Tags.ScheduleId INTO id
        ;
        RETURN id;
    END IF;
    RETURN -1;
END; 
$$ LANGUAGE plpgsql
;