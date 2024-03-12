/*
RETURNS UserId 
*/
CREATE OR REPLACE FUNCTION NewUser (
    UserAccount_p      TEXT,
    UserName_p         TEXT,
    UserPassword_p     TEXT
)
RETURNS INT
AS $$
DECLARE
    id INT;
BEGIN
    INSERT INTO 
        Users (UserAccount, UserName, UserPassword, UserDescription, UserBackgroundImage, UserPhoto)
    VALUES 
        (UserAccount_p, UserName_p, UserPassword_p, '', '', '')
    RETURNING UserId INTO id
    ;
    -- Adding Notifications
    INSERT INTO
        Notifications (
            UserId                      ,
            GeneralNotification         ,
            InvitationNotification      , 
            LoanNotification            ,
            DebtNotification            ,
            NewCreditNotification       ,
            NoteNotification
        )
    VALUES
        (
            id  ,
            TRUE,
            TRUE,
            TRUE,
            TRUE,
            TRUE,
            TRUE
        )
    ;
    RETURN id;
END; 
$$ LANGUAGE plpgsql
;