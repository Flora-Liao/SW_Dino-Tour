CREATE OR REPLACE FUNCTION ToggleFollowing (
    UserId_p           INT,
    FollowingAccount_p TEXT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN
    IF EXISTS (SELECT * FROM Followings WHERE UserId = UserId_p AND FollowingId = Account2Id(FollowingAccount_p))
    THEN
        DELETE FROM
            Followings
        WHERE
            UserId = UserId_p
            AND FollowingId = Account2Id(FollowingAccount_p)
        RETURNING Votes.id INTO id
        ;
    ELSE
        INSERT INTO
            Followings (UserId, FollowingId)
        VALUES
            (UserId_p, Account2Id(FollowingAccount_p))
        RETURNING Followings.id INTO id
        ;
    END IF
    ;
    RETURN id;
END; 
$$ LANGUAGE plpgsql
;