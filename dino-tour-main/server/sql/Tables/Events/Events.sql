CREATE TABLE Events (
    EventId             SERIAL PRIMARY KEY,
    ScheduleId          INT NOT NULL,
    EventOnDay          INT NOT NULL,
    EventOrder          INT NOT NULL,
    StayTime            TIME NOT NULL,
    EventName           TEXT NOT NULL,
    EventPhoto          TEXT NOT NULL,
    Info                TEXT NOT NULL,
    Traffic             TEXT,
    
    FOREIGN KEY (ScheduleId) REFERENCES Schedules(ScheduleId) ON DELETE CASCADE,
    UNIQUE (ScheduleId, EventOnDay, EventOrder)
);