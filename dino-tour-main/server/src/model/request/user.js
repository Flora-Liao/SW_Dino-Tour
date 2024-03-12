//const ListOwnedSchedules = require('./schedule.js').ListOwnedSchedules;

if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function GetScheduleCard(ScheduleId) {
    const sql = `
        SELECT
            ScheduleId, ScheduleName, ScheduleDescription, StartDate, ScheduleImage,
            Id2Account(OwnerId) AS Author,
            (SELECT COALESCE(COUNT(*), 0) AS Vote_E FROM Votes WHERE ScheduleId = $<ScheduleId> AND Vote = 'Economic'),
            (SELECT COALESCE(COUNT(*), 0) AS Vote_D FROM Votes WHERE ScheduleId = $<ScheduleId> AND Vote = 'Delicious'),
            (SELECT COALESCE(COUNT(*), 0) AS Vote_P FROM Votes WHERE ScheduleId = $<ScheduleId> AND Vote = 'Popular')
        FROM
            Schedules
        WHERE
            ScheduleId = $<ScheduleId>
    `;
    return db.one(sql, {ScheduleId}).then(
        data => {
            return {
                ...data,
                authorinfo: GetUserInfo(data.author)
            }
        }
    );
}


function ListOwnedSchedules(UserId) {
    const sql = `
        SELECT ListOwnedSchedules($<UserId>)
    `;
    return db.any(sql, {UserId}).then(
        data => {
            return data.map((obj) => {
                return GetScheduleCard(obj.listownedschedules);
            })
        }
    );
}

/**
 * Everything you need on UserPage
 * UserId is viewing ViewingAccount
 * @param   {integer}   UserId 
 * @param   {string}    ViewingAccount 
 * @returns {object}
 */
function GetUserPage(UserId, ViewingAccount) {
    const sql = `
        SELECT
            UserId, 
            UserAccount, 
            UserName, 
            UserDescription, 
            UserBackgroundImage, 
            UserPhoto,
            GetNumOfFollowings(UserAccount) AS NumOfFollowings,
            GetNumOfFollowers(UserAccount) AS NumOfFollowers,
            GetNumOfScheduleArchived(UserAccount) AS NumOfScheduleArchived,
            GetNumOfPublicSchedules(UserAccount) AS NumOfPublicSchedules,
            IsFollowing($<UserId>, UserAccount) AS IsFollowing,
            (UserId = $<UserId>) AS IsMe
        FROM
            Users
        WHERE
            UserAccount = $<ViewingAccount>
    `;
    return db.one(sql, {UserId, ViewingAccount}).then(
        data => {
            return {
                ...data,
                listofownedschedules: ListOwnedSchedules(data.userid)
            }
        }
    );
}

/** 
 * Given Account, returns user account, user name and user photo
 * @param   {string}    UserAccount 
 * @returns {object}
 */
function GetUserInfo(UserAccount) {
    const sql = `
        SELECT
            UserAccount, UserName, UserPhoto
        FROM
            Users
        WHERE
            UserAccount = $<UserAccount>
    `;
    return db.one(sql, {UserAccount});
}


/**
 * Given Account, returns its following user account.
 * @param   {string}    UserId 
 * @returns {object}
 */
function ListFollowingUsersById(UserId) {
    const sql = `
        SELECT ListFollowingUsersById($<UserId>)
    `;
    return db.any(sql, {UserId}).then(
        data => {
            return data.map((obj) => {
                return GetUserInfo(obj.listfollowingusersbyid);
            });
        }
    );
}

function ListFollowingUsersByAccount(UserAccount) {
    const sql = `
        SELECT ListFollowingUsersByAccount($<UserAccount>)
    `;
    return db.any(sql, {UserAccount}).then(
        data => {
            return data.map((obj) => {
                return GetUserInfo(obj.listfollowingusersbyaccount);
            });
        }
    );
}

/**
 * Given SearchText, returns list of user accounts that matches the searchtext
 * @param   {string}    SearchText 
 * @returns {object}
 */
function ListUsersByAccount(SearchText) {
    const sql = `
        SELECT ListUsersByAccount($<SearchText>)
    `;
    return db.any(sql, {SearchText}).then(
        data => {
            return data.map((obj) => {
                return GetUserInfo(obj.listusersbyaccount);
            })
        }
    );
}

/**
 * Search high rank users and its vote count with given Vote type
 * @param   {string}    Vote        {'Economic', 'Delicious', 'Popular', ''}
 * @returns {object}
 */
function ListUsersByRank(Vote) {
    const sql = `
        SELECT
            UserAccount,
            COALESCE(GetRank(UserAccount, $<Vote>), 0) AS rank
        FROM
            Users
        ORDER BY 
            rank
        DESC
    `;
    return db.any(sql, {Vote}).then(
        data => {
            const ret =  data.map((data_i) => {
                return {
                    userinfo: GetUserInfo(data_i.useraccount),
                    rank: data_i.rank
                };
            });
            return ret;
        }
    );
}

module.exports = {
    GetUserPage,
    GetUserInfo,
    ListFollowingUsersById,
    ListFollowingUsersByAccount,
    ListUsersByAccount,
    ListUsersByRank
};
