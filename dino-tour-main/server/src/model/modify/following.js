if (!global.db) {
  const pgp = require('pg-promise')();
  db = pgp(process.env.DB_URL);
}

/**
 * UserId is now following FollowingAccount, returns the following id.
 * @param   {integer}   UserId
 * @param   {string}    FollowingAccount
 * @return  {integer}
 */
function NewFollowing(UserId, FollowingAccount) {
    const sql = `
        SELECT NewFollowing($<UserId>, $<FollowingAccount>)
    `;
    return db.one(sql, {UserId, FollowingAccount});
}

/**
 * UserId unfollows FollowingAccount, returns the following id.
 * @param   {integer}   UserId
 * @param   {string}    FollowingAccount
 * @return  {integer}
 */
function DeleteFollowing(UserId, FollowingAccount) {
   const sql = `
       SELECT DeleteFollowing($<UserId>, $<FollowingAccount>)
   `;
   return db.one(sql, {UserId, FollowingAccount});
}

module.exports = {
    NewFollowing,
    DeleteFollowing
};
