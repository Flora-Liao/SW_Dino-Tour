if (!global.db) {
  const pgp = require('pg-promise')();
  db = pgp(process.env.DB_URL);
}

function GetNotifications(UserId) {
    const sql = `
        SELECT
            GeneralNotification AS general, 
            InvitationNotification AS invite, 
            LoanNotification AS loan, 
            DebtNotification AS debt, 
            NewCreditNotification AS newcredit,
            NoteNotification AS note
        FROM
            Notifications
        WHERE
            UserId = $<UserId>
    `;
    return db.one(sql, {UserId});
}

module.exports = {
    GetNotifications
};
