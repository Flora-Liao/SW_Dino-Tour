if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function GetCreditInfo(CreditId) {
    const sql = `
        SELECT
            CreditId,
            CreateDate,
            Id2Account(UserId) AS Payer,
            Amount,
            Description
        FROM
            Credits
        WHERE
            CreditId = $<CreditId>
    `;
    return db.one(sql, {CreditId});
}

module.exports = {
    GetCreditInfo
};
  