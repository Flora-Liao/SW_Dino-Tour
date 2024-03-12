if (!global.db) {
  const pgp = require('pg-promise')();
  db = pgp(process.env.DB_URL);
}

/**
 * 
 * @param   {integer}   ScheduleId 
 * @param   {integer}   PayerId 
 * @param   {integer}   Amount 
 * @param   {string}    Description 
 * @param   {string}    InCharge            (format: UserAccount1,UserAccount2)
 * @returns {integer}
 */

function NewCredit(ScheduleId, PayerId, Amount, Description, InCharge) {
    const sql = `
        SELECT NewCredit($<ScheduleId>, $<PayerId>, $<Amount>, $<Description>, $<InCharge>)
    `;
    return db.one(sql, {ScheduleId, PayerId, Amount, Description, InCharge})
} 

function NewCreditByAccount(ScheduleId, PayerAccount, Amount, Description, InCharge) {
    const sql = `
        SELECT NewCredit($<ScheduleId>, Account2Id($<PayerAccount>), $<Amount>, $<Description>, $<InCharge>)
    `;
    return db.one(sql, {ScheduleId, PayerAccount, Amount, Description, InCharge})
} 

function DeleteCredit(CreditId) {
    const sql = `
        SELECT DeleteCredit($<CreditId>)
    `;
    return dh.one(sql, {CreditId});
}

function UpdateCredit(CreditId, Stat) {
    const sql = `
        SELECT UpdateCredit($<CreditId>, $<Stat>)
    `;
    return db.one(sql, {CreditId, Stat});
}

module.exports = {
    NewCredit,
    NewCreditByAccount,
    DeleteCredit,
    UpdateCredit
};
