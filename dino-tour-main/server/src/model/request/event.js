if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function GetEventInfo(UserId, EventId) {
    const sql = `
        SELECT
            EventId, EventName, EventOnDay, EventOrder, StayTime, EventPhoto, Info, Traffic,
            COALESCE((SELECT Cost FROM EventCosts WHERE UserId = $<UserId> AND EventId = $<EventId>), 0) AS Cost
        FROM
            Events
        WHERE
            EventId = $<EventId>
    `;
    return db.one(sql, {UserId, EventId});
}

module.exports = {
    GetEventInfo
};

