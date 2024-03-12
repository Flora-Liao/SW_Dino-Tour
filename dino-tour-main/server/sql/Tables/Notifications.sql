CREATE TABLE Notifications (
    UserId                      INT NOT NULL,
    GeneralNotification         BOOLEAN NOT NULL,
    InvitationNotification      BOOLEAN NOT NULL, 
    LoanNotification            BOOLEAN NOT NULL,
    DebtNotification            BOOLEAN NOT NULL,
    NewCreditNotification       BOOLEAN NOT NULL,
    NoteNotification            BOOLEAN NOT NULL,

    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE,
    UNIQUE (UserId)
);