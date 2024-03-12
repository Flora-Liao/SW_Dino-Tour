CREATE TABLE Tags (
    id                  SERIAL PRIMARY KEY,
    ScheduleId          INT NOT NULL,
    Tag                 TEXT NOT NULL,

    FOREIGN KEY (ScheduleId) REFERENCES Schedules(ScheduleId) ON DELETE CASCADE
);