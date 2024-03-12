CREATE TABLE Members (
    id                  SERIAL PRIMARY KEY,
    ScheduleId          INT NOT NULL,
    UserId              INT NOT NULL,
    Budget              INT NOT NULL,
    
    FOREIGN KEY (ScheduleId) REFERENCES Schedules (ScheduleId) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE,
    UNIQUE(ScheduleId, UserId)
);