const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../../middleware/access-controller.js');

const scheduleRequestModel = require('../../model/request/schedule.js');

const router = express.Router();

router.use(express.json());
router.use(accessController); // Allows cross-origin HTTP requests

const awaitObjectWithPromise = require('../utilities.js');

// List Archived Schedules (listCollection)
router.get('/listArchivedSchedules', function (req, res, next) {
    const { userId } = req.query;
    if (!userId) {
        const err = new Error('@listArchivedSchedules:Required: userId');
        err.status = 400;
        throw err;
    }
    scheduleRequestModel
        .ListArchivedSchedules(userId)
        .then((result) => {
            awaitObjectWithPromise(result).then(
                (obj) => {
                    res.json(obj);
                }
            );
        })
        .catch(next);
});

module.exports = router;