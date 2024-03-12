CREATE OR REPLACE FUNCTION NewFollowing (
    UserId_p           INT,
    FollowingAccount_p TEXT
)
RETURNS INT
AS $$
DECLARE 
    FollowingId_p INT;
    id INT;
BEGIN
    FollowingId_p = (SELECT Account2Id(FollowingAccount_p));
    
    INSERT INTO
        Followings (UserId, FollowingId)
    VALUES
        (UserId_p, FollowingId_p)
    RETURNING Followings.id INTO id;
    
    RETURN id;
END; 
$$ LANGUAGE plpgsql
;