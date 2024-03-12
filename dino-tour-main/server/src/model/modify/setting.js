if (!global.db) {
  const pgp = require('pg-promise')();
  db = pgp(process.env.DB_URL);
}

function UpdateNotifications(UserId, General, Invitation, Loan, Debt, NewCredit, Note) {
    const sql = `
        SELECT UpdateNotifications($<UserId>, $<General>, $<Invitation>, $<Load>, $<Debt>, $<NewCredit>, $<Note>)
    `;
    return db.one(sql, {UserId, General, Invitation, Loan, Debt, NewCredit, Note});
}

module.exports = {
    UpdateNotifications
};
