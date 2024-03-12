--CREATE TYPE VOTE_t as ENUM('Economic', 'Delicious', 'Popular');

CREATE TABLE Votes (
    id                  SERIAL PRIMARY KEY,
    UserId              INT NOT NULL,
    ScheduleId          INT NOT NULL,
    Vote                TEXT NOT NULL,
    Stamp               TIMESTAMP NOT NULL,
    
    UNIQUE (UserId, ScheduleId, Vote),
    FOREIGN KEY (UserId) REFERENCES Users (UserId) ON DELETE CASCADE,
    FOREIGN KEY (ScheduleId) REFERENCES Schedules (ScheduleId) ON DELETE CASCADE
);