CREATE OR REPLACE FUNCTION ListFollowingUsersByAccount (
    UserAccount_p               TEXT
)
RETURNS TABLE (
    UserAccount                 TEXT
)
AS $$
DECLARE
    UserId_p   INT;
BEGIN
    UserId_p = (SELECT Account2Id(UserAccount_p));
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