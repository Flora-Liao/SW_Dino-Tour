CREATE OR REPLACE FUNCTION UpdateEvent (
    UserId_p            INT,
    EventId_p           INT,
    StayTime_p          TIME,
    Traffic_p           TEXT,
    Cost_p              INT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN
    UPDATE
        Events
    SET
        StayTime = StayTime_p,
        Traffic = Traffic_p
    WHERE
        EventId = EventId_p
    RETURNING EventId INTO id
    ;

    INSERT INTO
        EventCosts(EventId, UserId, Cost)
    VALUES
        (EventId_p, UserId_p, Cost_p)
    ;
    UPDATE
        EventCosts
    SET
        Cost = Cost_p
    WHERE
        EventId = EventId_p
        AND UserId = UserId_p
    ;
    RETURN id;
END; 
$$ LANGUAGE plpgsql
;