CREATE OR REPLACE FUNCTION NewMember (
    UserId_p           INT,
    MemberAccount_p    TEXT,
    ScheduleId_p       INT,
    Budget_p           INT
)
RETURNS INT
AS $$
DECLARE 
    MemberId_p INT;
    id INT;
BEGIN
    MemberId_p = (SELECT Account2Id(MemberAccount_p));

    IF (IsOwner(UserId_p, ScheduleId_p)) 
    THEN
        INSERT INTO 
            Members (ScheduleId, UserId, Budget)
        VALUES 
            (ScheduleId_p,  MemberId_p, Budget_p)
        RETURNING Members.id INTO id
        ;
        RETURN id;
    END IF;
    RETURN -1;
END; 
$$ LANGUAGE plpgsql
;