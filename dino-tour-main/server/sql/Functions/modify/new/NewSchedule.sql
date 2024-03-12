CREATE OR REPLACE FUNCTION NewSchedule (
    UserId_p                INT,
    ScheduleName_p          TEXT,
    StartDate_p             DATE,
    EndDate_p               DATE,
    Public_p                BOOLEAN,
    HasCredits_p            BOOLEAN,

    Budget_p                INT,
    InitMemberAccounts_p    TEXT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
    r RECORD;
    NumOfDays INT;
    D INT;
    trash INT;
BEGIN
    INSERT INTO 
        Schedules (OwnerId, ScheduleName, ScheduleDescription, ScheduleImage, StartDate, EndDate, Public, HasCredits, CreateTimeStamp)
    VALUES 
        (UserId_p, ScheduleName_p, '', '', StartDate_p, EndDate_p, Public_p, HasCredits_p, current_timestamp)
    RETURNING ScheduleId INTO id
    ;
    -- Adding Initial Members' memberships, with budget = Budget_p
    FOR r IN
        SELECT unnest(
            string_to_array(InitMemberAccounts_p, ',')
        ) AS InitMemberAccount
    LOOP
        trash = (SELECT NewMember(UserId_p, r.InitMemberAccount, id, Budget_p));
    END LOOP
    ;
    -- Adding StartTimes for this schedule
    NumOfDays = (SELECT EndDate_p - StartDate_p);
    FOR D IN 1..NumOfDays
    LOOP
        INSERT INTO
            ScheduleStartTimes (ScheduleId, OnDay, StartTime)
        VALUES
            (id, D, '08:00:00')
        ;
    END LOOP
    ;
    RETURN id;
END; 
$$ LANGUAGE plpgsql
;