const GetCreditInfo = require('./credit.js').GetCreditInfo;
const GetEventInfo = require('./event.js').GetEventInfo;
const GetNoteInfo = require('./note.js').GetNoteInfo;
const GetTagInfo = require('./tag.js').GetTagInfo;
const GetUserInfo = require('./user.js').GetUserInfo;
const ListMembers = require('./member.js').ListMembers;

if (!global.db) {
  const pgp = require('pg-promise')();
  db = pgp(process.env.DB_URL);
}
/**
 * Everything you need to render a schedule
 * @param   {integer}   ScheduleId 
 * @returns {object}
 */
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

function GetScheduleInfo(UserId, ScheduleId) {
    const sql = `
        SELECT
            ScheduleId, ScheduleName, ScheduleDescription, StartDate, EndDate, 
            (EndDate - StartDate) AS Days,
            Public,
            (OwnerId = $<UserId>) AS isMine,
            Id2Account(OwnerId) AS Author,
            GetBudget($<UserId>, ScheduleId) AS Budget, 
            GetPredictedCost($<UserId>, ScheduleId) AS PredictedCost
        FROM
            Schedules
        WHERE
            ScheduleId = $<ScheduleId>
    `;
    return db.one(sql, {UserId, ScheduleId}).then(
        data => {
            return {
                ...data,
                authorinfo:     GetUserInfo(data.author),
                listofmembers:  ListMembers(data.scheduleid),
                listoftags:     ListTags(data.scheduleid)
            }
        }
    )
}

function GetSchedulePage(UserId, ScheduleId) {
    const sql = `
        SELECT
            ScheduleId, ScheduleName, ScheduleDescription, StartDate, EndDate, Public,
            (OwnerId = $<UserId>) AS isMine,
            (SELECT COALESCE(COUNT(*), 0) AS Vote_E FROM Votes WHERE ScheduleId = $<ScheduleId> AND Vote = 'Economic'),
            (SELECT COALESCE(COUNT(*), 0) AS Vote_D FROM Votes WHERE ScheduleId = $<ScheduleId> AND Vote = 'Delicious'),
            (SELECT COALESCE(COUNT(*), 0) AS Vote_P FROM Votes WHERE ScheduleId = $<ScheduleId> AND Vote = 'Popular'),
            (SELECT COALESCE(COUNT(*), 0) AS HasVote_E FROM Votes WHERE UserId = $<UserId> AND ScheduleId = $<ScheduleId> AND Vote = 'Economic'),
            (SELECT COALESCE(COUNT(*), 0) AS HasVote_D FROM Votes WHERE UserId = $<UserId> AND ScheduleId = $<ScheduleId> AND Vote = 'Delicious'),
            (SELECT COALESCE(COUNT(*), 0) AS HasVote_P FROM Votes WHERE UserId = $<UserId> AND ScheduleId = $<ScheduleId> AND Vote = 'Popular')
        FROM
            Schedules
        WHERE
            ScheduleId = $<ScheduleId>
    `;
    return db.one(sql, {UserId, ScheduleId}).then(
        data => {
            return {
                ...data,
                listofstartingtimes: ListStartingTimes(data.scheduleid),
                listofevents: ListEvents(UserId, data.scheduleid)
            };
        }
    );
}

/**
 * 
 * @param   {string}    SearchText 
 * @param   {string}    Vote                {'Economic', 'Delicious', 'Popular', ''}
 * @returns 
 */
async function ListPublicSchedules(SearchText, Vote) {
    const sql = `
        SELECT ListPublicSchedules($<SearchText>, $<Vote>)
    `;
    (async () => {
        
    })
    return await db.any(sql, {SearchText, Vote}).then(
        data => {
            return data.map((data_i) => {
                return GetScheduleCard(data_i.listpublicschedules);
            });
        }
    );
}

/**
 * 
 * @param   {string} UserAccount 
 * @returns {object}
 */
function ListSchedulesByAccount(UserAccount) {
    const sql = `
        SELECT ListSchedulesByAccount($<UserAccount>)
    `;
    return db.any(sql, {UserAccount}).then(
        data => {
            return data.map((obj) => {
                return GetScheduleCard(obj.listschedulesbyaccount);
            })
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

function ListVisibleSchedules(UserId) {
    const sql = `
        SELECT ListVisibleSchedules($<UserId>)
    `;
    return db.any(sql, {UserId}).then(
        data => {
            return data.map((obj) => {
                return GetScheduleCard(obj.listvisibleschedules);
            })
        }
    );
}

function ListArchivedSchedules(UserId) {
    const sql = `
        SELECT ListArchivedSchedules($<UserId>)
    `;
    return db.any(sql, {UserId}).then(
        data => {
            return data.map((obj) => {
                return GetScheduleCard(obj.listarchivedschedules);
            });
        }
    );
}

function ListLedgers(UserId) {
    const sql = `
        SELECT
            ScheduleId,
            IsCleanedUp($<UserId>, ScheduleId) AS iscleanedup
        FROM
            Schedules
        WHERE
            IsMember($<UserId>, ScheduleId)
            AND HasCredits = true
    `;
    return db.any(sql, {UserId}).then(
        data => {
            return data.map((obj) => {
                return {
                    iscleanedup: obj.iscleanedup,
                    schedulecard: GetScheduleCard(obj.scheduleid),
                    listofmembers: ListMembers(obj.scheduleid)
                }
            });
        }
    );
}

function ListEventsOnDay(UserId, ScheduleId, OnDay) {
    const sql = `
        SELECT ListEventsOnday($<UserId>, $<ScheduleId>, $<OnDay>)
    `;
    return db.any(sql, {UserId, ScheduleId, OnDay}).then(
        data => {
            return data.map((obj) => {
                return GetEventInfo(UserId, obj.listeventsonday);
            });
        }
    );
}

function ListEvents(UserId, ScheduleId) {
    const sql = `
        SELECT ListEvents($<UserId>, $<ScheduleId>)
    `;
    return db.any(sql, {UserId, ScheduleId}).then(
        data => {
            return data.map((obj) => {
                return GetEventInfo(UserId, obj.listevents);
            });
        }
    );
}


function ListNotes(ScheduleId) {
    const sql = `
        SELECT ListNotes($<ScheduleId>)
    `;
    return db.any(sql, {ScheduleId}).then(
        data => {
            return data.map((obj) => {
                return GetNoteInfo(obj.listnotes);
            });
        }
    );
}

function ListTags(ScheduleId) {
    const sql = `
        SELECT ListTags($<ScheduleId>)
    `;
    return db.any(sql, {ScheduleId}).then(
        data => {
            return data.map((obj) => {
                return GetTagInfo(obj.listtags);
            });
        }
    )
}

function ListDebts(UserAccount, ScheduleId) {
    const sql = `
        SELECT
            (SELECT UserName FROM Users WHERE UserId = Members.UserId) AS Name,
            Id2Account(Members.UserId) AS Account,
            GetSumOfDebt(Account2Id($<UserAccount>), Id2Account(Members.UserId), $<ScheduleId>) AS Debt
        FROM
            Members
        WHERE
            ScheduleId = $<ScheduleId>
        ORDER BY
            Debt
        DESC
        ;
    `;
    return db.any(sql, {UserAccount, ScheduleId});
}

function GetPredictedCost(UserId, ScheduleId) {
    const sql = `
        SELECT GetPredictedCost($<UserId>, $<ScheduleId>)
    `;
    return db.one(sql, {UserId, ScheduleId});
}

function GetBudget(UserId, ScheduleId) {
    const sql = `
        SELECT
            Budget
        FROM
            Members
        WHERE
            UserId = $<UserId>
            AND ScheduleId = $<ScheduleId>
    `;
    return db.one(sql, {UserId, ScheduleId});
}

function ListCredits(ScheduleId) {
    const sql = `
        SELECT ListAllCredits($<ScheduleId>)
    `;
    return db.any(sql, {ScheduleId}).then(
        data => {
            return data.map((obj) => {
                return GetCreditInfo(obj.listallcredits);
            });
        }
    )
}

function ListStartingTimes(ScheduleId) {
    const sql = `
        SELECT
            StartTime
        FROM
            ScheduleStartTimes
        WHERE
            ScheduleId = $<ScheduleId>
        ORDER BY
            OnDay
        ASC
    `;
    return db.any(sql, {ScheduleId});
}

module.exports = {
    GetScheduleCard,
    GetScheduleInfo,
    GetSchedulePage,
    ListPublicSchedules,
    ListSchedulesByAccount,
    ListOwnedSchedules,
    ListVisibleSchedules,
    ListArchivedSchedules,
    ListLedgers,
    ListEventsOnDay,
    ListNotes,
    ListTags,
    ListDebts,
    GetPredictedCost,
    GetBudget,
    ListCredits,
};
