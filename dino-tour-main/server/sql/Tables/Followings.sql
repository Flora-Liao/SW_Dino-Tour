CREATE TABLE Followings (
    id                  SERIAL PRIMARY KEY,
    UserId              INT NOT NULL,
    FollowingId         INT NOT NULL,
    
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE,
    FOREIGN KEY (FollowingId) REFERENCES Users (UserId) ON DELETE CASCADE,
    UNIQUE(UserId, FollowingId)
);