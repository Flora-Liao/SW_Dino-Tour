const GetUserInfo = require('./user.js').GetUserInfo;

if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function GetNoteInfo(NoteId) {
    const sql = `
        SELECT
            id AS NoteId, 
            Id2Account(UserId) AS UserAccount,
            Content,
            Colour
        FROM
            Notes
        WHERE
            id = $<NoteId>
    `;
    return db.one(sql, {NoteId}).then(
        data => {
            return {
                noteid: data.noteid,
                userinfo: GetUserInfo(data.useraccount),
                content: data.content,
                colour: data.colour
            };
        }
    );
}

module.exports = {
    GetNoteInfo
};
