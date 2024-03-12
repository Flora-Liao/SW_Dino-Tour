const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../../middleware/access-controller.js');

const userRequestModel = require('../../model/request/user.js');
const userModifyModel = require('../../model/modify/user.js');

const router = express.Router();

router.use(express.json());
router.use(accessController); // Allows cross-origin HTTP requests

const awaitObjectWithPromise = require('../utilities.js');

// Get User Page (getUserInfo)
router.get('/getUserPage', function (req, res, next) {
    const { userId, viewingAccount } = req.query;
    if (!userId || viewingAccount == null) {
        const err = new Error('@getUserPage:Required: userId, viewingAccount');
        err.status = 400;
        throw err;
    }
    userRequestModel
        .GetUserPage(userId, viewingAccount)
        .then((result) => {
            awaitObjectWithPromise(result).then(
                (obj) => {
                    res.json(obj);
                }
            );
        })
        .catch(next);
});

router.post(
    '/toggleFollowing',
    function (req, res, next) {
        const { userId, viewingAccount } = req.body;
        if (!userId || viewingAccount == null) {
            const err = new Error('@signup:Required: userId, viewingAccount');
            err.status = 400;
            throw err;
        }
        userModifyModel
            .ToggleFollowing(userId, viewingAccount)
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