const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../../middleware/access-controller.js');

const scheduleRequestModel = require('../../model/request/schedule.js');
const creditModifyModel = require('../../model/modify/credit.js');

const router = express.Router();

router.use(express.json());
router.use(accessController); // Allows cross-origin HTTP requests

const awaitObjectWithPromise = require('../utilities.js');

// List Credits (listCredit)
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

// Add a new Credit (addCredit)
router.post(
    '/newCredit',
    function (req, res, next) {
        const { scheduleId, description, amount, payerAccount, inChargeAccounts} = req.body;
        if (!scheduleId || description == null || amount == null || payerAccount == null || inChargeAccounts == null) {
            const err = new Error('@newCredit:Required: scheduleId, description, amount, payerAccount, inChargeAccount');
            err.status = 400;
            throw err;
        }
        creditModifyModel
            .NewCreditByAccount(scheduleId, payerAccount, amount, description, inChargeAccounts)
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