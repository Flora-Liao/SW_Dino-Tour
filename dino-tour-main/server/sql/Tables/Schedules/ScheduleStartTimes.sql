CREATE TABLE ScheduleStartTimes (
    id                  SERIAL PRIMARY KEY,
    ScheduleId          INT NOT NULL,
    OnDay               INT NOT NULL,
    StartTime           TIME NOT NULL,

    FOREIGN KEY (ScheduleId) REFERENCES Schedules(ScheduleId) ON DELETE CASCADE,
    UNIQUE (ScheduleId, OnDay)
);