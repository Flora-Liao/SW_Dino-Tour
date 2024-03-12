const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../../middleware/access-controller.js');

const scheduleRequestModel = require('../../model/request/schedule.js');
const userRequestModel = require('../../model/request/user.js');
const eventRequestModel = require('../../model/request/event.js');
const scheduleModifyModel = require('../../model/modify/schedule.js');

const router = express.Router();

router.use(express.json());
router.use(accessController); // Allows cross-origin HTTP requests

const awaitObjectWithPromise = require('../utilities.js');

// List Public Schedules (listExplore)
router.get('/listPublicSchedules', function (req, res, next) {
    const { searchText, vote } = req.query;
    if (searchText == null || vote == null) {
        const err = new Error('@listPublicSchedules:Required: searchText, vote');
        err.status = 400;
        throw err;
    }
    scheduleRequestModel
        .ListPublicSchedules(searchText, vote)
        .then((result) => {
            awaitObjectWithPromise(result).then(
                (obj) => {
                    res.json(obj);
                }
            )
        })
        .catch(next);
});

// List Users By Rank (listRanking)
router.get('/listUsersByRank', function (req, res, next) {
    const { vote } = req.query;
    if (vote == null) {
        const err = new Error('@listUsersByRank:Required: vote');
        err.status = 400;
        throw err;
    }
    userRequestModel
        .ListUsersByRank(vote)
        .then((result) => {
            awaitObjectWithPromise(result).then(
                (obj) => {
                    res.json(obj);
                }
            );
        })
        .catch(next);
});

// Get Schedule Page (getScheduleGeneral)
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

// Get Schedule Info (getScheduleInfo)
router.get('/getScheduleInfo', function (req, res, next) {
    const { userId, scheduleId } = req.query;
    if (!userId || !scheduleId) {
        const err = new Error('@getScheduleInfo:Required: userId, scheduleId');
        err.status = 400;
        throw err;
    }
    scheduleRequestModel
        .GetScheduleInfo(userId, scheduleId)
        .then((result) => {
            awaitObjectWithPromise(result).then(
                (obj) => {
                    res.json(obj);
                }
            );
        })
        .catch(next);
});

// Get Event Info (getSpotInfo)
router.get('/getEventInfo', function (req, res, next) {
    const { userId, eventId } = req.query;
    if (!userId || !eventId) {
        const err = new Error('@getEventInfo:Required: userId, eventId');
        err.status = 400;
        throw err;
    }
    eventRequestModel
        .GetEventInfo(userId, eventId)
        .then((result) => {
            awaitObjectWithPromise(result).then(
                (obj) => {
                    res.json(obj);
                }
            );
        })
        .catch(next);
});

// ========================================


// Toggle Vote (toggleLikeSchedule)
router.post(
    '/toggleVote',
    function (req, res, next) {
        const { userId, scheduleId, vote } = req.body;
        if (!userId || !scheduleId || vote == null) {
            const err = new Error('@toggleVote:Required: userId, scheduleId, vote');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .ToggleVote(userId, scheduleId, vote)
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

// Toggle Archive (toggleCollection)
router.post(
    '/toggleArchive',
    function (req, res, next) {
        const { userId, scheduleId } = req.body;
        if (!userId || !scheduleId) {
            const err = new Error('@toggleVote:Required: userId, scheduleId');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .ToggleArchive(userId, scheduleId)
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