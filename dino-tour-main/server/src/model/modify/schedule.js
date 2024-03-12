if (!global.db) {
  const pgp = require('pg-promise')();
  db = pgp(process.env.DB_URL);
}

/**
 * Create a new schedule, returns the ScheduleId of it.
 * @param   {integer}   UserId
 * @param   {string}    ScheduleName
 * @param   {string}    StartDate           (format: YYYY-MM-DD)
 * @param   {string}    EndDate             (format: YYYY-MM-DD)
 * @param   {boolean}   Public
 * @param   {boolean}   HasCredits
 * @param   {integer}   Budget
 * @param   {string}    InitMemberAccounts  (format: member1,member2,member3)
 * @return  {integer}
 */
function NewSchedule(UserId, ScheduleName, StartDate, EndDate, Public, HasCredits, Budget, InitMemberAccounts) {
    const sql = `
        SELECT NewSchedule($<UserId>, $<ScheduleName>, $<StartDate>, $<EndDate>, $<Public>, $<Budget>, $<InitMemberAccounts>)
    `;
    return db.one(sql, {UserId, ScheduleName, StartDate, EndDate, Public, HasCredits, Budget, InitMemberAccounts});
}

/**
 * Delete schedule with the given ScheduleId if UserId is the owner of it, returns the ScheduleId of it.
 * Returns -1 if UserId is not the owner of it.
 * @param   {integer}   UserId
 * @param   {integer}   ScheduleId
 * @return  {integer}
 */
function DeleteSchedule(UserId, ScheduleId) {
    const sql = `
        SELECT DeleteSchedule($<UserId>, $<ScheduleId>)
    `;
    return db.one(sql, {UserId, ScheduleId});
}

/**
 * Update schedule with the given ScheduleId if UserId is the owner of it, returns the ScheduleId of it.
 * Returns -1 if UserId is not the owner of it.
 * @param   {integer}   UserId
 * @param   {integer}   ScheduleId
 * @param   {string}    ScheduleName
 * @param   {string}    StartDate           (format: YYYY-MM-DD)
 * @param   {string}    EndDate             (format: YYYY-MM-DD)
 * @param   {boolean}   Public
 * @return  {integer}
 */
function UpdateSchedule(UserId, ScheduleId, ScheduleName, StartDate, EndDate, Public) {
    const sql = `
        SELECT UpdateSchedule($<UserId>, $<ScheduleId>, $<ScheduleName>, $<StartDate>, $<EndDate>, $<Public>)
    `;
    return db.one(sql, {UserId, ScheduleId, ScheduleName, StartDate, EndDate, Public});
}

function UpdateScheduleStartTime(UserId, ScheduleId, OnDay, StartTime) {
    const sql = `
        SELECT UpdateScheduleStartTime($<UserId>, $<ScheduleId>, $<OnDay>, $<StartTime>)
    `;
    return db.one(sql, {UserId, ScheduleId, OnDay, StartTime});
}

/**
 * Update schedule description with the given ScheduleId, returns the ScheduleId of it.
 * @param   {integer}   ScheduleId 
 * @param   {string}    ScheduleDescription 
 * @return  {integer}
 */
function UpdateScheduleDescription(UserId, ScheduleId, ScheduleDescription) {
    const sql = `
        SELECT UpdateScheduleDescription($<UserId>, $<ScheduleId>, $<ScheduleDescription>)
    `;
    return db.one(sql, {UserId, ScheduleId, ScheduleDescription});
}

/**
 * Update schedule image with the given ScheduleId, returns the ScheduleId of it.
 * @param   {integer}     ScheduleId 
 * @param   {string}      Image
 * @return  {integer}
 */
function UpdateScheduleImage(UserId, ScheduleId, Image) {
    const sql = `
        SELECT UpdateScheduleImage($<UserId>, $<ScheduleId>, $<Image>)
    `;
    return db.one(sql, {UserId, ScheduleId, Image});
}

/*
===============================Below are also schedule related================================
*/

/**
 * Create a new archive UserId -> ScheduleId, returns archive id if success, -1 otherwise
 * @param   {integer}   UserId 
 * @param   {integer}   ScheduleId 
 * @return  {integer}
 */
function NewArchive(UserId, ScheduleId) {
    const sql = `
        SELECT NewArchive($<UserId>, $<ScheduleId>)
    `;
    return db.one(sql, {UserId, ScheduleId});
}
/**
 * Delete a archive UserId -> ScheduleId, returns archive id if success, -1 otherwise
 * @param   {integer}   UserId 
 * @param   {integer}   ScheduleId 
 * @returns {integer}  
 */
function DeleteArchive(UserId, ScheduleId) {
    const sql = `
        SELECT DeleteArchive($<UserId>, $<ScheduleId>)
    `;
    return db.one(sql, {UserId, ScheduleId});
}

function ToggleArchive(UserId, ScheduleId) {
    const sql = `
        SELECT ToggleArchive($<UserId>, $<ScheduleId>)
    `;
    return db.one(sql, {UserId, ScheduleId});
}
/**
 * UserId put a new note on ScheduleId, with content and colour specified, returns note id if success, -1 otherwise.
 * @param   {integer}   UserId 
 * @param   {integer}   ScheduleId 
 * @param   {string}    Content         
 * @param   {string}    Colour          {'red', 'blue', 'yellow', 'green'}
 * @returns {integer}
 */
function NewNote(UserId, ScheduleId, Content, Colour) {
    const sql = `
        SELECT NewNote($<UserId>, $<ScheduleId>, $<Content>, $<Colour>)
    `;
    return db.one(sql, {UserId, ScheduleId, Content, Colour});
}

/**
 * Delete note with NoteId, returns NoteId
 * @param   {integer}   NoteId 
 * @returns {integer}
 */
function DeleteNote(NoteId) {
    const sql = `
        SELECT DeleteNote($<NoteId>)
    `;
    return db.one(sql, {NoteId});
}
/**
 * Update note's content and colour with noteId, reutrns NoteId
 * @param   {integer}   NoteId 
 * @param   {string}    Content 
 * @param   {string}    Colour      {'red', 'blue', 'yellow', 'green'}
 * @returns {integer}
 */
function UpdateNote(NoteId, Content, Colour) {
    const sql = `
        SELECT UpdateNote($<NoteId>, $<Content>, $<Colour>)
    `;
    return db.one(sql, {NoteId, Content, Colour});
}

/**
 * UserId add a Tag on ScheduleId, returns tagid if success, -1 otherwise
 * @param   {integer}   UserId 
 * @param   {integer}   ScheduleId 
 * @param   {string}    Tag 
 * @returns {integer}
 */
function NewTag(UserId, ScheduleId, Tag) {
    const sql = `
        SELECT NewTag($<UserId>, $<ScheduleId>, $<Tag>)
    `;
    return db.one(sql, {UserId, ScheduleId, Tag});
}

/**
 * Delete tag with TagId, returns TagId
 * @param   {integer}   TagId
 * @returns {integer}   
 */
 function DeleteTag(TagId) {
    const sql = `
        SELECT DeleteTag($<TagId>)
    `;
    return db.one(sql, {TagId});
}

/**
 * Add a new Vote UserId -> ScheduleId, returns the voteId
 * @param   {integer}   UserId 
 * @param   {integer}   ScheduleId 
 * @param   {string}    Vote            {'Economic', 'Delicious', 'Popular'}
 * @returns {integer}
 */
function NewVote(UserId, ScheduleId, Vote) {
    const sql = `
        SELECT NewVote($<UserId>, $<ScheduleId>, $<Vote>)
    `;
    return db.one(sql, {UserId, ScheduleId, Vote});
}

/**
 * Delete a Vote UserId -> ScheduleId, returns the voteId
 * @param   {integer}   UserId 
 * @param   {integer}   ScheduleId 
 * @param   {string}    Vote            {'Economic', 'Delicious', 'Popular'}
 * @returns {integer}
 */
function DeleteVote(UserId, ScheduleId, Vote) {
    const sql = `
        SELECT DeleteVote($<UserId>, $<ScheduleId>, $<Vote>)
    `;
    return db.one(sql, {UserId, ScheduleId, Vote});
}

function ToggleVote(UserId, ScheduleId, Vote) {
    const sql = `
        SELECT ToggleVote($<UserId>, $<ScheduleId>, $<Vote>)
    `;
    return db.one(sql, {UserId, ScheduleId, Vote});
}

function DeleteEventsOnDay(UserId, ScheduleId, OnDay) {
    const sql = `
        SELECT DeleteEventsOnDay($<UserId>, $<ScheduleId>, $<OnDay>)
    `;
    return db.one(sql, {UserId, ScheduleId, OnDay});
}

// ! ABANDONED
/* ?
const eventTemplate = {
    eventid	:	4
    eventname	:	wake up
    eventonday	:	1
    eventorder	:	3
    staytime	:	01:00:00
    eventphoto	:	wake up photo
    info	:	blablabla
    traffic	:	motorcycle
    cost	:	0
}
const starttimeTemplate = {
    starttime: 08:00:00
}
*/
function UpdateScheduleContents(UserId, ScheduleId, ListOfStartTimes, ListOfEvents) {
    const deleteWhere = [];
    for (const i of ListOfEvents) {
        updateSql.push(`
            UPDATE
                Events
            SET
                EventOnDay  = $<eventonday>,
                EventOrder  = $<eventorder>,
                StayTime    = $<staytime>,
                EventName   = $<eventname>,
                EventPhoto  = $<eventphoto>,
                Info        = $<info>
                Traffic     = $<traffic>  
            WHERE
                EventId     = $<eventid>
            ;
        `, {...i});
        deleteWhere.push(`EventId != $<eventid>`, {...i});
    }
    const deleteSql = `
        DELETE FROM
            Events
        WHERE
            ScheduleId = $<ScheduleId>
            ${deleteWhere.length ? 'AND' + deleteWhere.join('AND') : ''}
        ;
    `;
    const sql = [updateSql, deleteSql]
}

module.exports = {
    // Schedule
    NewSchedule,
    UpdateSchedule,
    DeleteSchedule,
    UpdateScheduleDescription,
    UpdateScheduleImage,
    UpdateScheduleStartTime,
    // Schedule Related
    // Archive
    NewArchive,
    DeleteArchive,
    ToggleArchive,
    // Note
    NewNote,
    DeleteNote,
    UpdateNote,
    // Tag
    NewTag,
    DeleteTag,
    // Vote
    NewVote,
    DeleteVote,
    ToggleVote,
    // Events
    DeleteEventsOnDay
};
