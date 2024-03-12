CREATE OR REPLACE FUNCTION UpdateEventCost (
    UserId_p           INT,
    EventId_p          INT,
    Cost_p             INT
)
RETURNS INT
AS $$
DECLARE 
    id INT;
BEGIN
    UPDATE
        EventCosts
    SET
        Cost = Cost_p
    WHERE
        UserId = UserId_p
        AND EventId = EventId_p
    RETURNING EventCosts.id INTO id
    ;
    RETURN id;
END; 
$$ LANGUAGE plpgsql
;