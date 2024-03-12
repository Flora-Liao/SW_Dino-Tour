CREATE OR REPLACE FUNCTION NewEventCost (
    UserId_p           INT,
    EventId_p          INT,
    Cost_p             INT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN
    INSERT INTO 
        EventCosts (UserId, EventId, Cost) 
    VALUES 
        (UserId_p, EventId_p, Cost_p) 
    RETURNING EventCosts.id INTO id
    ;
    RETURN id;
END; 
$$ LANGUAGE plpgsql
;