CREATE OR REPLACE FUNCTION UpdateMember (
    UserId_p           INT,
    ScheduleId_p       INT,
    Budget_p           INT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN
    IF (IsMember(UserId_p, ScheduleId_p)) 
    THEN
        UPDATE
            Members 
        SET
            Budget = Budget_p
        WHERE
            ScheduleId = ScheduleId_p
            AND UserId = UserId_p
        RETURNING Members.id INTO id
        ;
        RETURN id;
    END IF;
    RETURN -1;
END; 
$$ LANGUAGE plpgsql
;