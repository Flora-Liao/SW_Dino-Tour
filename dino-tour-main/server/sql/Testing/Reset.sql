DO $$
DECLARE
    trash INT;
    r RECORD;
BEGIN

FOR r IN
    SELECT UserId FROM Users
LOOP
    trash = (SELECT DeleteUser(r.UserId));
END LOOP;

/**/
RAISE NOTICE 'All Reseted';
/**/

END $$;
