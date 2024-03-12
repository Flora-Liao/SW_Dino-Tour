if (!global.db) {
  const pgp = require('pg-promise')();
  db = pgp(process.env.DB_URL);
}
/**
 * Create a new user account, returns the UserId of it.
 * @param {string} UserAccount
 * @param {string} UserName
 * @return {number}
 */
function NewUser(UserAccount, UserName) {
    const sql = `
        SELECT NewUser($<UserAccount>, $<UserName>)
    `;
    return db.one(sql, {UserAccount, UserName});
}

/**
 * Delete user account with the given UserId, returns the UserId of it.
 * @param {number} UserId
 * @return {number}
 */
function DeleteUser(UserId) {
    const sql = `
        SELECT DeleteUser($<UserId>)
    `;
    return db.one(sql, {UserId});
}

/**
 * Update username and password of the user account with the given UserId, returns the UserId of it.
 * @param {number} UserId
 * @param {string} UserName
 * @param {string} UserPassword
 * @return {number}
 */
function UpdateUser(UserId, UserName, UserPassword) {
    const sql = `
        SELECT UpdateUser($<UserId>, $<UserName>, $<UserPassword>)
    `;
    return db.one(sql, {UserId, UserName, UserPassword});
}

function UpdateUserName(UserId, UserName) {
    const sql = `
        UPDATE
            Users
        SET
            UserName = $<UserName>
        WHERE
            UserId = $<UserId>
        RETURNING UserId
    `;
    return db.one(sql, {UserId, UserName});
}

function UpdateUserPassword(UserId, UserPassword) {
    const sql = `
        UPDATE
            Users
        SET
            UserPassword = $<UserPassword>
        WHERE
            UserId = $<UserId>
        RETURNING UserId
    `;
    return db.one(sql, {UserId, UserPassword});
}


/**
 * Update user description of the user account with the given UserId, returns the UserId of it.
 * @param {number} UserId
 * @param {string} UserDescription
 * @return {number}
 */
function UpdateUserDescription(UserId, UserDescription) {
    const sql = `
        SELECT UpdateUserDescription($<UserId>, $<UserDescription>)
    `;
    return db.one(sql, {UserId, UserDescription});
}

/**
 * Update user background image of the user account with the given UserId, returns the UserId of it.
 * @param {number} UserId
 * @param {string} BackgroundImage
 * @return {number}
 */
function UpdateUserBackgroundImage(UserId, BackgroundImage) {
    const sql = `
        SELECT UpdateUserBackgroundImage($<UserId>, $<BackgroundImage>)
    `;
    return db.one(sql, {UserId, BackgroundImage});
}

/**
 * Update user photo of the user account with the given UserId, returns the UserId of it.
 * @param {number} UserId
 * @param {string} Photo
 * @return {number}
 */
function UpdateUserPhoto(UserId, Photo) {
    const sql = `
        SELECT UpdateUserPhoto($<UserId>, $<Photo>)
    `;
    return db.one(sql, {UserId, Photo});
}

function ToggleFollowing(UserId, ViewingAccount) {
    const sql = `
        SELECT ToggleFollowing($<UserId>, $<ViewingAccount>)
    `;
    return db.one(sql, {UserId, ViewingAccount});
}

module.exports = {
    // Account related
    NewUser,
    DeleteUser,
    UpdateUser,
    UpdateUserName,
    UpdateUserPassword,
    // User Description related
    UpdateUserDescription,
    // Image related
    UpdateUserBackgroundImage,
    UpdateUserPhoto,
    // Following related
    ToggleFollowing
};
