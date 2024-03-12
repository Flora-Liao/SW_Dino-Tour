if (!global.db) {
  const pgp = require('pg-promise')();
  db = pgp(process.env.DB_URL);
}

/**
 * Create a new Event if UserId is member of ScheduleId, returns the event id of it, or -1 otherwise
 * @param   {integer}   UserId
 * @param   {integer}   ScheduleId
 * @param   {integer}   EventOnDay
 * @param   {integer}   EventOrder
 * @param   {string}    StayTime        (format: HH:MM:SS)
 * @param   {string}    EventName
 * @param   {string}    EventPhoto
 * @param   {string}    Info
 * @param   {string}    Traffic
 * @return  {integer}
 */
function NewEvent(UserId, ScheduleId, EventOnDay, EventOrder, StayTime, EventName, EventPhoto, Info, Traffic) {
    const sql = `
        SELECT NewEvent($<UserId>, $<ScheduleId>, $<EventOnDay>, $<EventOrder>, $<StayTime>, $<EventName>, $<EventPhoto>, $<Info>, $<Traffic>)
    `;
    return db.one(sql, {UserId, ScheduleId, EventOnDay, EventOrder, StayTime, EventName, EventPhoto, Info, Traffic});
}

/**
 * Delete the Event with EventId, returns the event id of it.
 * @param   {integer}   EventId
 * @return  {integer}
 */
function DeleteEvent(EventId) {
    const sql = `
        SELECT DeleteEvent($<EventId>)
    `;
    return db.one(sql, {EventId});
}

/**
 * @param   {integer}   EventId
 * @param   {string}    StayTime        (format: HH:MM:SS)
 * @param   {string}    EventName
 * @param   {string}    Info
 * @param   {string}    Traffic
 * @param   {integer}
 */
function UpdateEvent(UserId, EventId, StayTime, Traffic, Cost) {
    const sql = `
        SELECT UpdateEvent($<UserId>, $<EventId>, $<StayTime>, $<Traffic>, $<Cost>)
    `;
    return db.one(sql, {UserId, EventId, StayTime, Traffic, Cost});
}


/**
 * @param   {integer}   EventId
 * @param   {integer}   MoveTo
 * @param   {integer}
 */
function MoveEvent(EventId, MoveTo) {
    const sql = `
        SELECT ReOrderEvent($<EventId>, $<MoveTo>)
    `;
    return db.one(sql, {EventId, MoveTo});
}

/**
 * @param   {integer}   UserId
 * @param   {integer}   EventId
 * @param   {integer}   Cost
 * @return  {integer}
 */
function NewEventCost(UserId, EventId, Cost) {
    const sql = `
        SELECT NewEventCost($<UserId>, $<EventId>, $<Cost>)
    `;
    return db.one(sql, {UserId, EventId, Cost});
}

/**
 * @param   {integer}   UserId
 * @param   {integer}   EventId
 * @param   {integer}   Cost
 * @return  {integer}
 */
function UpdateEventCost(UserId, EventId, Cost) {
    const sql = `
        SELECT UpdateEventCost($<UserId>, $<EventId>, $<Cost>)
    `;
    return db.one(sql, {UserId, EventId, Cost});
}


module.exports = {
    NewEvent,
    DeleteEvent,
    UpdateEvent,
    MoveEvent,
    NewEventCost,
    UpdateEventCost
};
