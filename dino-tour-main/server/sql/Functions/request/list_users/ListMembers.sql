CREATE OR REPLACE FUNCTION ListMembers (
    ScheduleId_p        INT
)
RETURNS TABLE (
    UserAccount         TEXT
)
AS $$
BEGIN
    RETURN QUERY 
    SELECT 
        Users.UserAccount
    FROM
        Users
    WHERE
        IsMember(Users.UserId, ScheduleId_p)
    ;
END; 
$$ LANGUAGE plpgsql
;