CREATE OR REPLACE FUNCTION GetNumOfFollowers (
    UserAccount_p      TEXT
)
RETURNS INT
AS $$
DECLARE
    UserId_p INT;
    NumOfFollowers INT;
BEGIN
    UserId_p = (SELECT Account2Id(UserAccount_p));

    SELECT 
        COUNT(Followings.id)
    FROM
        Users
    LEFT JOIN
        Followings
    ON
        Users.UserId = Followings.FollowingId
    GROUP BY
        Users.UserId
    HAVING
        Users.UserId = UserId_p
    INTO
        NumOfFollowers
    ;

    RETURN COALESCE(NumOfFollowers, 0);
END; 
$$ LANGUAGE plpgsql
;