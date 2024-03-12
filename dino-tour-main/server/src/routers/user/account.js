const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../../middleware/access-controller.js');

const loginRequestModel = require('../../model/request/login.js');
const userModifyModel = require('../../model/modify/user.js');

const router = express.Router();

router.use(express.json());
router.use(accessController); // Allows cross-origin HTTP requests

const awaitObjectWithPromise = require('../utilities.js');

// login (login)
router.get('/login', function (req, res, next) {
    const { userAccount, userPassword } = req.query;
    if (!userAccount || !userPassword) {
        const err = new Error('@login:Required: userAccount, usePassword');
        err.status = 400;
        throw err;
    }
    loginRequestModel
        .Login(userAccount, userPassword)
        .then((result) => {
            awaitObjectWithPromise(result).then(
                (obj) => {
                    res.json(obj);
                }
            );
        })
        .catch(next);
});

// sign up (createAccount)
router.post(
    '/signup',
    function (req, res, next) {
        const { userAccount, userName, userPassword } = req.body;
        if (!userAccount || !userName || !userPassword) {
            const err = new Error('@signup:Required: userAccount, userName, userPassword');
            err.status = 400;
            throw err;
        }
        loginRequestModel
            .Signup(userAccount, userName, userPassword)
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

// Update Account (changePassword)
router.post(
    '/updateAccount',
    function (req, res, next) {
        const { userId, userName, userPassword } = req.body;
        if (!userId || !userName || !userPassword) {
            const err = new Error('@updateAccount:Required: userId, userName, userPassword');
            err.status = 400;
            throw err;
        }
        userModifyModel
            .UpdateUser(userId, userName, userPassword)
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

// Delete Account
router.post(
    '/deleteAccount',
    function (req, res, next) {
        const { userId } = req.body;
        if (!userId) {
            const err = new Error('@deleteAccount:Required: userId');
            err.status = 400;
            throw err;
        }
        userModifyModel
            .DeleteUser(userId)
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