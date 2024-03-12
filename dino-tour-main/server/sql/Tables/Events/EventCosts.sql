CREATE TABLE EventCosts (
    id                  SERIAL PRIMARY KEY,
    UserId              INT NOT NULL,
    EventId             INT NOT NULL,
    Cost                INT NOT NULL,

    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE,
    FOREIGN KEY (EventId) REFERENCES Events(EventId) ON DELETE CASCADE,
    UNIQUE (UserId, EventId)
);