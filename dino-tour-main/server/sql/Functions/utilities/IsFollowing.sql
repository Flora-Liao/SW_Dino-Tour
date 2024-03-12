CREATE OR REPLACE FUNCTION IsFollowing (
    UserId_p           INT,
    FollowingAccount_p VARCHAR(20)
)
RETURNS BOOLEAN
AS $$
DECLARE
    FollowingId_p INT;
BEGIN
    FollowingId_p = (SELECT Account2Id(FollowingAccount_p));
    IF EXISTS (
        SELECT
            *
        FROM
            Followings
        WHERE
            UserId = UserId_p
            AND FollowingId = FollowingId_p
    ) THEN
        RETURN TRUE;
    END IF;
    
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql
;