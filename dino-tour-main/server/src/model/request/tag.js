if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function GetTagInfo(TagId) {
    const sql = `
        SELECT
            id,
            Tag
        FROM
            Tags
        WHERE
            id = $<TagId>
    `;
    return db.one(sql, {TagId});
}

module.exports = {
    GetTagInfo
};
