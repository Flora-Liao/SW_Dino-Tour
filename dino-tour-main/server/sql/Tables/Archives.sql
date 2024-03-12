CREATE TABLE Archives (
    id                  SERIAL PRIMARY KEY,
    UserId              INT,
    ScheduleId          INT,

    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE,
    FOREIGN KEY (ScheduleId) REFERENCES Schedules(ScheduleId) ON DELETE CASCADE,
    UNIQUE (UserId, ScheduleId)
);