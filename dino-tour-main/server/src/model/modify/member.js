if (!global.db) {
  const pgp = require('pg-promise')();
  db = pgp(process.env.DB_URL);
}

/**
 * Add a new member with given member account, returns its member id if success, or -1 otherwise.
 * This operation will be performed only if UserId is the owner of this schedule
 * @param   {integer}   UserId
 * @param   {string}    MemberAccount
 * @param   {integer}   ScheduleId
 * @param   {integer}   Budget
 * @return  {integer}
 */
function NewMember(UserId, MemberAccount, ScheduleId, Budget) {
    const sql = `
        SELECT NewMember($<UserId>, $<MemberAccount>, $<ScheduleId>, $<Budget>)
    `;
    return db.one(sql, {UserId, MemberAccount, ScheduleId, Budget});
}

/**
 * Remove a member with given member account, returns its member id if success, or -1 otherwise.
 * This operation will be performed only if UseId is the owner of this schedule
 * @param   {integer}   UserId
 * @param   {string}    MemberAccount
 * @param   {integer}   ScheduleId
 * @return  {integer}
 */
function DeleteMember(UserId, MemberAccount, ScheduleId) {
   const sql = `
       SELECT DeleteMember($<UserId>, $<MemberAccount>, $<ScheduleId>)
   `;
   return db.one(sql, {UserId, MemberAccount, ScheduleId});
}

/**
 * Update a member budget with given member account, returns its member id if success, or -1 otherwise.
 * This operation will be performed only if UserId is the member of the Schedule
 * @param   {integer}   UserId
 * @param   {integer}   ScheduleId
 * @param   {integer}   Budget
 * @return  {integer}
 */
function UpdateMember(UserId, ScheduleId, Budget) {
   const sql = `
       SELECT UpdateMember($<UserId>, $<ScheduleId>, $<Budget>)
   `;
   return db.one(sql, {UserId, ScheduleId, Budget});
}

module.exports = {
    NewMember,
    DeleteMember,
    UpdateMember
};
