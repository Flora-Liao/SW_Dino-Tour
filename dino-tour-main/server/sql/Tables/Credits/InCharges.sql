CREATE TABLE InCharges (
    id                  SERIAL PRIMARY KEY,
    UserId              INT,
    CreditId            INT,

    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE,
    FOREIGN KEY (CreditId) REFERENCES Credits(CreditId) ON DELETE CASCADE,
    UNIQUE (UserId, CreditId)
);