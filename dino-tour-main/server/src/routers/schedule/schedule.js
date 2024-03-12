const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../../middleware/access-controller.js');

const scheduleModifyModel = require('../../model/modify/schedule.js');
const scheduleRequestModel = require('../../model/request/schedule.js');

const router = express.Router();

router.use(express.json());
router.use(accessController); // Allows cross-origin HTTP requests

const awaitObjectWithPromise = require('../utilities.js');

// List Visible Schedules (listMySchedule)
router.get('/listVisibleSchedules', function (req, res, next) {
    const { userId } = req.query;
    if (!userId) {
        const err = new Error('@listVisibleSchedules:Required: userId');
        err.status = 400;
        throw err;
    }
    scheduleRequestModel
        .ListVisibleSchedules(userId)
        .then((result) => {
            awaitObjectWithPromise(result).then(
                (obj) => {
                    res.json(obj);
                }
            );
        })
        .catch(next);
});

// New Schedule (createSchedule)
router.post(
    '/newSchedule',
    function (req, res, next) {
        const { userId, scheduleName, starDate, endDate, isPublic, hasCredits, budget, initMemberAccounts } = req.body;
        if (!userId || !scheduleName || !starDate || !endDate || !isPublic || !hasCredits || !budget || !initMemberAccounts) {
            const err = new Error('@newSchedule:Required: userId, scheduleName, starDate, endDate, isPublic, hasCredits, budget, initMemberAccounts');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .NewSchedule(userId, scheduleName, starDate, endDate, isPublic, hasCredits, budget, initMemberAccounts)
            .then((result) => {
                awaitObjectWithPromise(result).then(
                    (obj) => {
                        res.json(obj);
                    }
                );
            })
            .catch(next);
    }
);

// =================================================================================================================================
// Get Schedule Page
router.get('/getSchedulePage', function (req, res, next) {
    const { userId, scheduleId } = req.query;
    if (!userId || !scheduleId) {
        const err = new Error('@getSchedulePage:Required: userId, scheduleId');
        err.status = 400;
        throw err;
    }
    scheduleRequestModel
        .GetSchedulePage(userId, scheduleId)
        .then((result) => {
            awaitObjectWithPromise(result).then(
                (obj) => {
                    res.json(obj);
                }
            );
        })
        .catch(next);
});

// List Tags
router.get('/listTags', function (req, res, next) {
    const { scheduleId } = req.query;
    if (!scheduleId) {
        const err = new Error('@listTags:Required: scheduleId');
        err.status = 400;
        throw err;
    }
    scheduleRequestModel
        .ListTags(scheduleId)
        .then((result) => {
            awaitObjectWithPromise(result).then(
                (obj) => {
                    res.json(obj);
                }
            );
        })
        .catch(next);
});

// List Credits
router.get('/listCredits', function (req, res, next) {
    const { scheduleId } = req.query;
    if (!scheduleId) {
        const err = new Error('@listCredits:Required: scheduleId');
        err.status = 400;
        throw err;
    }
    scheduleRequestModel
        .ListCredits(scheduleId)
        .then((result) => {
            awaitObjectWithPromise(result).then(
                (obj) => {
                    res.json(obj);
                }
            );
        })
        .catch(next);
});

// List Debts
router.get('/listDebts', function (req, res, next) {
    const { userAccount, scheduleId } = req.query;
    if (!userAccount || !scheduleId) {
        const err = new Error('@listDebts:Required: userAccount, scheduleId');
        err.status = 400;
        throw err;
    }
    scheduleRequestModel
        .ListDebts(userAccount, scheduleId)
        .then((result) => {
            awaitObjectWithPromise(result).then(
                (obj) => {
                    res.json(obj);
                }
            );
        })
        .catch(next);
});

// List Schedules By Account
router.get('/listSchedulesByAccount', function (req, res, next) {
    const { userAccount } = req.query;
    if (!userAccount) {
        const err = new Error('@listSchedulesByAccount:Required: userAccount');
        err.status = 400;
        throw err;
    }
    scheduleRequestModel
        .ListSchedulesByAccount(userAccount)
        .then((result) => {
            awaitObjectWithPromise(result).then(
                (obj) => {
                    res.json(obj);
                }
            );
        })
        .catch(next);
});

// Delete Schedule
router.post(
    '/deleteSchedule',
    function (req, res, next) {
        const { userId, scheduleId } = req.body;
        if (!userId || !scheduleId) {
            const err = new Error('@deleteSchedule:Required: userId, scheduleId');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .DeleteSchedule(userId, scheduleId)
            .then((result) => {
                awaitObjectWithPromise(result).then(
                    (obj) => {
                        res.json(obj);
                    }
                );
            })
            .catch(next);
    }
);

// Update Schedule
router.post(
    '/updateSchedule',
    function (req, res, next) {
        const { userId, scheduleId, scheduleName, startDate, endDate, public } = req.body;
        if (!userId || !scheduleId || !scheduleName || !startDate || !endDate || !public) {
            const err = new Error('@updateSchedule:Required: userId, scheduleId, scheduleName, startDate, endDate, public');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .UpdateSchedule(userId, scheduleId, scheduleName, startDate, endDate, public)
            .then((result) => {
                awaitObjectWithPromise(result).then(
                    (obj) => {
                        res.json(obj);
                    }
                );
            })
            .catch(next);
    }
);

// Update Schedule Description
router.post(
    '/updateScheduleDescription',
    function (req, res, next) {
        const { userId, scheduleId, scheduleDescription } = req.body;
        if (!userId || !scheduleId || !scheduleDescription) {
            const err = new Error('@updateScheduleDescription:Required: userId, scheduleId, scheduleDescription');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .UpdateScheduleDescription(userId, scheduleId, scheduleDescription)
            .then((result) => {
                awaitObjectWithPromise(result).then(
                    (obj) => {
                        res.json(obj);
                    }
                );
            })
            .catch(next);
    }
);

// Update Schedule Image
router.post(
    '/updateScheduleImage',
    function (req, res, next) {
        const { userId, scheduleId, Image } = req.body;
        if (!userId || !scheduleId || !Image) {
            const err = new Error('@updateScheduleImage:Required: userId, scheduleId, Image');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .UpdateScheduleImage(userId, scheduleId, Image)
            .then((result) => {
                awaitObjectWithPromise(result).then(
                    (obj) => {
                        res.json(obj);
                    }
                );
            })
            .catch(next);
    }
);

module.exports = router;