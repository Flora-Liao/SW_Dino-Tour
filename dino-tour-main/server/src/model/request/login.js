if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function Login(UserAccount, UserPassword) {
    const sql = `
        SELECT Login($<UserAccount>, $<UserPassword>)
    `;
    return db.one(sql, {UserAccount, UserPassword});
}

function Signup(UserAccount, UserName, UserPassword) {
    const sql = `
        SELECT NewUser($<UserAccount>, $<UserName>, $<UserPassword>)
    `;
    return db.one(sql, {UserAccount, UserName, UserPassword});
}

module.exports = {
    Login,
    Signup
};
