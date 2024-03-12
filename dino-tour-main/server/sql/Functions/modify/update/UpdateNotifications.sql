CREATE OR REPLACE FUNCTION UpdateNotifications (
    UserId_p                        INT,
    GeneralNotification_p           BOOLEAN,
    InvitationNotification_p        BOOLEAN, 
    LoanNotification_p              BOOLEAN,
    DebtNotification_p              BOOLEAN,
    NewCreditNotification_p         BOOLEAN,
    NoteNotification_p              BOOLEAN
)
RETURNS INT
AS $$
DECLARE
    id INT;
BEGIN
    UPDATE
        Notifications
    SET
        GeneralNotification = GeneralNotification_p,
        InvitationNotification = InvitationNotification_p,
        LoanNotification = LoanNotification_p,
        DebtNotification = DebtNotification_p,
        NewCreditNotification = NewCreditNotification_p,
        NoteNotification = NoteNotification_p
    WHERE
        UserId = UserId_p
    RETURNING UserId INTO id
    ;
    RETURN id;
END; $$ LANGUAGE plpgsql
;