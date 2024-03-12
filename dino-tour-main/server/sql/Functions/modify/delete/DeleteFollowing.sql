CREATE OR REPLACE FUNCTION DeleteFollowing (
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
    
    DELETE FROM
        Followings
    WHERE
        UserId = UserId_p
        AND FollowingId = FollowingId_p
    RETURNING Followings.id INTO id
    ;
    RETURN id;
END; 
$$ LANGUAGE plpgsql
;