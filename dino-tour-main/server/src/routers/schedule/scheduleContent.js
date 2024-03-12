const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../../middleware/access-controller.js');

const scheduleRequestModel = require('../../model/request/schedule.js');
const scheduleModifyModel = require('../../model/modify/schedule.js');

const router = express.Router();

router.use(express.json());
router.use(accessController); // Allows cross-origin HTTP requests

const awaitObjectWithPromise = require('../utilities.js');

// Get Schedule Page (getScheduleContent)
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

// ================================================
// !

// New Event 
router.post(
    '/newEvent',
    function (req, res, next) {
        const { userId, scheduleId, eventOnDay, eventOrder, stayTime, eventName, eventPhoto, info, traffic } = req.body;
        if (!userId || !scheduleId || !eventOnDay || !eventOrder || stayTime == null || eventName == null || eventPhoto == null || info == null || traffic == null) {
            const err = new Error('@newEvent:Required: eventId');
            err.status = 400;
            throw err;
        }
        eventModifyModel
            .NewEvent(userId, scheduleId, eventOnDay, eventOrder, stayTime, eventName, eventPhoto, info, traffic)
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

// Update Event 
router.post(
    '/updateEvent',
    function (req, res, next) {
        const { userId, eventId, stayTime, traffic, cost } = req.body;
        if (!userId || !eventId || stayTime == null || traffic == null || cost == null) {
            const err = new Error('@updateEvent:Required: eventId');
            err.status = 400;
            throw err;
        }
        eventModifyModel
            .UpdateEvent(userId, eventId, stayTime, traffic, cost)
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

// Move Event
router.post(
    '/moveEvent',
    function (req, res, next) {
        const { userId, eventId, stayTime, traffic, cost } = req.body;
        if (!userId || !eventId || stayTime == null || traffic == null || cost == null) {
            const err = new Error('@updateEvent:Required: eventId');
            err.status = 400;
            throw err;
        }
        eventModifyModel
            .MoveEvent(userId, eventId, stayTime, traffic, cost)
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


// Delete Events on Day 
router.post(
    '/deleteEventsOnDay',
    function (req, res, next) {
        const { userId, scheduleId, onDay } = req.body;
        if (!userId || !scheduleId || !onDay) {
            const err = new Error('@deleteEventsOnDay:Required: userId, scheduleId, onDay');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .DeleteEventsOnDay(userId, scheduleId, onDay)
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

// Delete Event 
router.post(
    '/deleteEvent',
    function (req, res, next) {
        const { eventId } = req.body;
        if (!eventId) {
            const err = new Error('@deleteEvent:Required: eventId');
            err.status = 400;
            throw err;
        }
        eventModifyModel
            .DeleteEvent(eventId)
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

// Update StartTime
router.post(
    '/updateStartTime',
    function (req, res, next) {
        const { userId, scheduleId, onDay, startTime } = req.body;
        if (!userId || !scheduleId || !onDay || startTime == null) {
            const err = new Error('@updateStartTime:Required: userId, scheduleId, onDay, startTime');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .UpdateScheduleStartTime(userId, scheduleId, onDay, startTime)
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