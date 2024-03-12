CREATE TABLE Schedules (
    ScheduleId          SERIAL PRIMARY KEY,
    OwnerId             INT NOT NULL,
    ScheduleName        TEXT NOT NULL,
    ScheduleDescription TEXT NOT NULL,
    ScheduleImage       TEXT NOT NULL,
    StartDate           DATE NOT NULL,
    EndDate             DATE NOT NULL,
    Public              BOOLEAN NOT NULL,
    HasCredits          BOOLEAN NOT NULL,
    CreateTimeStamp     TimeStamp,
    
    FOREIGN KEY (OwnerId) REFERENCES Users (UserId) ON DELETE CASCADE
); 