CREATE TABLE Notes (
    id                  SERIAL PRIMARY KEY,
    ScheduleId          INT,
    UserId              INT,
    Content             TEXT,
    Colour              TEXT,
    CreateTimeStamp     TimeStamp,

    FOREIGN KEY (ScheduleId) REFERENCES Schedules(ScheduleId) ON DELETE CASCADE,
    FOREIGN kEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE
);