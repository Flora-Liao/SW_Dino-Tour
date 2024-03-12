CREATE OR REPLACE FUNCTION GetNotifications (
    UserId_p                INT
)
RETURNS SETOF Notifications
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        *
    FROM
        Notifications
    WHERE
        UserId = UserId_p
    ;
END; 
$$ LANGUAGE plpgsql
;