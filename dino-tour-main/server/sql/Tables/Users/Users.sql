CREATE TABLE Users (
    UserId              SERIAL PRIMARY KEY,
    UserAccount         TEXT NOT NULL UNIQUE,
    UserName            TEXT NOT NULL,
    UserPassword        TEXT NOT NULL,
    UserDescription     TEXT NOT NULL,
    UserBackgroundImage TEXT NOT NULL,
    UserPhoto           TEXT NOT NULL
);