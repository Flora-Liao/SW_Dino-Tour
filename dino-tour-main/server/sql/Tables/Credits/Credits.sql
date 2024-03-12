CREATE TABLE Credits (
    CreditId            SERIAL PRIMARY KEY,
    ScheduleId          INT NOT NULL,
    UserId              INT NOT NULL,
    Amount              INT NOT NULL,
    Stat                BOOLEAN NOT NULL,
    CreateDate          DATE NOT NULL,
    Description         TEXT,
    
    FOREIGN KEY (ScheduleId) REFERENCES Schedules(ScheduleId) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users (UserId) ON DELETE CASCADE
);