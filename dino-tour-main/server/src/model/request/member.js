const GetUserInfo = require('./user.js').GetUserInfo;

if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function ListMembers(ScheduleId) {
    const sql = `
        SELECT ListMembers($<ScheduleId>)
    `;
    return db.any(sql, {ScheduleId}).then(
        data => {
            return data.map((obj) => {
                return GetUserInfo(obj.listmembers);
            });
        }
    );
}

module.exports = {
    ListMembers
};
