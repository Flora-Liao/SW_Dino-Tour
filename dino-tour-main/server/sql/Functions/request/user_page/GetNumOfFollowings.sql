CREATE OR REPLACE FUNCTION GetNumOfFollowings (
    UserAccount_p      TEXT
)
RETURNS INT
AS $$
DECLARE
    UserId_p INT;
    NumOfFollowings INT;
BEGIN
    UserId_p = (SELECT Account2Id(UserAccount_p));

    SELECT 
        COUNT(Followings.id)
    FROM
        Users
    LEFT JOIN
        Followings
    ON
        Users.UserId = Followings.UserId
    GROUP BY
        Users.UserId
    HAVING
        Users.UserId = UserId_p
    INTO
        NumOfFollowings
    ;

    RETURN COALESCE(NumOfFollowings, 0);
END; 
$$ LANGUAGE plpgsql
;