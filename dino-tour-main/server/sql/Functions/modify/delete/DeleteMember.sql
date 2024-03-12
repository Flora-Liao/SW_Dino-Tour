CREATE OR REPLACE FUNCTION DeleteMember (
    UserId_p           INT,
    MemberAccount_p    TEXT,
    ScheduleId_p       INT
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
        DELETE FROM
            Members
        WHERE
            UserId = MemberId_p
            AND ScheduleId = ScheduleId_p
        RETURNING Members.id INTO id
        ;
        DELETE FROM
            EventCosts
        WHERE
            UserId = MemberId_p
            AND 
            EXISTS (
                SELECT 
                    *
                FROM
                    Events
                WHERE
                    Events.EventId = EventCosts.EventId
                    AND Events.ScheduleId = ScheduleId_p
            )
        ;
        /*
        Delete related data or not?
        */
        /*
        DELETE FROM
            Credits
        WHERE
            UserId = MemberId_p
            ANd ScheduleId = ScheduleId_p
        ;
        */
        RETURN id;
    END IF;
    RETURN -1;
END; 
$$ LANGUAGE plpgsql
;