const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../../middleware/access-controller.js');

const scheduleModifyModel = require('../../model/modify/schedule.js');
const scheduleRequestModel = require('../../model/request/schedule.js');
const memberModifyModel = require('../../model/modify/member.js');

const router = express.Router();

router.use(express.json());
router.use(accessController); // Allows cross-origin HTTP requests

const awaitObjectWithPromise = require('../utilities.js');

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

// Delete Schedule (deleteSchedule)
router.post(
    '/deleteSchedule',
    function (req, res, next) {
        const { userId, scheduleId } = req.body;
        if (!userId || !scheduleId ) {
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


// ! Pay attention to this one
// Update Schedule Info (updateScheduleInfo)
router.post(
    '/updateSchedule',
    function (req, res, next) {
        const { userId, scheduleId, scheduleName, startDate, endDate, isPublic } = req.body;
        if (!userId || !scheduleId || scheduleName == null || !startDate || !endDate || isPublic == null) {
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

router.post(
    '/updateScheduleDescription',
    function (req, res, next) {
        const { userId, scheduleId, description } = req.body;
        if (!userId || !scheduleId || description == null) {
            const err = new Error('@updateScheduleDescription:Required: userId, scheduleId, description');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .UpdateScheduleDescription(userId, scheduleId, description)
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

router.post(
    '/updateScheduleImage',
    function (req, res, next) {
        const { userId, scheduleId, image } = req.body;
        if (!userId || !scheduleId || image == null) {
            const err = new Error('@updateScheduleImage:Required: userId, scheduleId, image');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .UpdateScheduleImage(userId, scheduleId, image)
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

// Members related
router.post(
    '/deleteMember',
    function (req, res, next) {
        const { userId, memberAccount, scheduleId} = req.body;
        if (!userId || memberAccount == null || !scheduleId) {
            const err = new Error('@deleteMember:Required: userId, memberAccount, scheduleId');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .DeleteMember(userId, memberAccount, scheduleId)
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

router.post(
    '/newMember',
    function (req, res, next) {
        const { userId, memberAccount, scheduleId, budget} = req.body;
        if (!userId || memberAccount == null || !scheduleId || budget == null) {
            const err = new Error('@newMember:Required: userId, memberAccount, scheduleId, budget');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .NewMember(userId, memberAccount, scheduleId, budget)
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

// !! Update Budget
router.post(
    '/updateMember',
    function (req, res, next) {
        const { userId, scheduleId, budget } = req.body;
        if (!userId || !scheduleId || budget != null) {
            const err = new Error('@updateMember:Required: userId, scheduleId, budget');
            err.status = 400;
            throw err;
        }
        memberModifyModel
            .UpdateMember(userId, scheduleId, budget)
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

router.post(
    '/newTag',
    function (req, res, next) {
        const { userId, scheduleId, tag} = req.body;
        if (!userId || !scheduleId || tag == null) {
            const err = new Error('@newTag:Required: userId, scheduleId, tag');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .NewTag(userId, scheduleId, tag)
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

router.post(
    '/deleteTag',
    function (req, res, next) {
        const { tagId } = req.body;
        if (!tagId) {
            const err = new Error('@deleteTag:Required: tagId');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .DeleteTag(tagId)
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