const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../../middleware/access-controller.js');

const scheduleRequestModel = require('../../model/request/schedule.js');
const creditModifyModel = require('../../model/modify/credit.js');

const router = express.Router();

router.use(express.json());
router.use(accessController); // Allows cross-origin HTTP requests

const awaitObjectWithPromise = require('../utilities.js');

// List debts (listPayment, listRecover)
router.get('/listDebts', function (req, res, next) {
    const { memberAccount, scheduleId} = req.query;
    if (memberAccount == null || !scheduleId) {
        const err = new Error('@listDebts:Required: memberAccount, scheduleId');
        err.status = 400;
        throw err;
    }
    scheduleRequestModel
        .ListDebts(memberAccount, scheduleId)
        .then((result) => {
            awaitObjectWithPromise(result).then(
                (obj) => {
                    res.json(obj);
                }
            );
        })
        .catch(next);
});

// Clean Up Debts (deleteRecoverCredit)
router.post(
    '/cleanUp',
    function (req, res, next) {
        const { userId, scheduleId, amount, memberAccount} = req.body;
        if (!userId || !scheduleId || amount == null|| memberAccount == null) {
            const err = new Error('@cleanUp:Required: userId, scheduleId, amount, memberAccount');
            err.status = 400;
            throw err;
        }
        creditModifyModel
            .NewCredit(scheduleId, userId, -amount, 'Clean up debts', memberAccount)
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