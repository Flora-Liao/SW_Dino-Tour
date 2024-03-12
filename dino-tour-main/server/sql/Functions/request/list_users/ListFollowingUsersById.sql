CREATE OR REPLACE FUNCTION ListFollowingUsersById (
    UserId_p            INT
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
        IsFollowing(UserId_p, Users.UserAccount)
    ;
END; 
$$ LANGUAGE plpgsql
;