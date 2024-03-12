const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../../middleware/access-controller.js');

const settingModifyModel = require('../../model/modify/setting.js');
const userModifyModel = require('../../model/modify/user.js');
const settingRequestModel = require('../../model/request/setting.js');
const userRequestModel = require('../../model/request/user.js');


const router = express.Router();

router.use(express.json());
router.use(accessController); // Allows cross-origin HTTP requests

const awaitObjectWithPromise = require('../utilities.js');

/* My profile */

// Get User Page (getSettingProfile)
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

// Update User (changeNameOrPassword)
router.post('/updateUser', function (req, res, next) {
    const { userId, userName, password } = req.body;
    if (!userId || userName == null || password == null) {
        const err = new Error('Required: userId, userName, password');
        err.status = 400;
        throw err;
    }
    userModifyModel
        .UpdateUser(userId, userName, password)
        .then((result) => {
            awaitObjectWithPromise(result).then(
                (obj) => {
                    res.json(obj);
                }
            );
        })
        .catch(next);
});

// Update User Name
router.post('/updateUserName', function (req, res, next) {
    const { userId, userName} = req.body;
    if (!userId || userName == null) {
        const err = new Error('Required: userId, userName');
        err.status = 400;
        throw err;
    }
    userModifyModel
        .UpdateUserName(userId, userName)
        .then((result) => {
            awaitObjectWithPromise(result).then(
                (obj) => {
                    res.json(obj);
                }
            );
        })
        .catch(next);
});

// Update User Password
router.post('/updateUserPassword', function (req, res, next) {
    const { userId, password} = req.body;
    if (!userId || password == null) {
        const err = new Error('Required: userId, password');
        err.status = 400;
        throw err;
    }
    userModifyModel
        .UpdateUserPassword(userId, password)
        .then((result) => {
            awaitObjectWithPromise(result).then(
                (obj) => {
                    res.json(obj);
                }
            );
        })
        .catch(next);
});

// Update User Description (editIntro)
router.post(
    '/updateUserDescription',
    function (req, res, next) {
        const { userId, description } = req.body;
        if (!userId || description == null) {
            const err = new Error('@updateUserDescription:Required: userId, description');
            err.status = 400;
            throw err;
        }
        userModifyModel
            .UpdateUserDescription(userId, description)
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

// Update User Photo (changeAvatar)
router.post(
    '/updateUserPhoto',
    function (req, res, next) {
        const { userId, image } = req.body;
        if (!userId || image == null) {
            const err = new Error('@updateUserPhoto:Required: userId, image');
            err.status = 400;
            throw err;
        }
        userModifyModel
            .UpdateUserPhoto(userId, image)
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

// Update User Background Image (changeBackgroundImage)
router.post(
    '/updateUserBackgroundImage',
    function (req, res, next) {
        const { userId, image} = req.body;
        if (!userId || image == null) {
            const err = new Error('@updateUserBackgroundImage:Required: userId, image');
            err.status = 400;
            throw err;
        }
        userModifyModel
            .UpdateUserBackgroundImage(userId, image)
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

/* Notification */

// Get Notifications (getNotificationInfo)
router.get('/getNotifications',
    function (req, res, next) {
        const { userId } = req.query;
        if (!userId) {
            const err = new Error('@getNotifications:Required: userId');
            err.status = 400;
            throw err;
        }
        settingRequestModel
            .GetNotifications(userId)
            .then((result) => {
                awaitObjectWithPromise(result).then(
                    (obj) => {
                        res.json(obj);
                    }
                );
            })
            .catch(next);
    });

// Update Notifications (toggleNotification)
router.post(
    '/updateNotifications',
    function (req, res, next) {
        const { userId, general, invitation, loan, debt, newCredit, note } = req.body;
        if (!userId || general == null || invitation == null || loan == null || debt == null || newCredit == null || note == null) {
            const err = new Error('@updateNotifications:Required: userId, general, invitation, loan, debt, newCredit, note');
            err.status = 400;
            throw err;
        }
        settingModifyModel
            .UpdateNotifications(userId, general, invitation, loan, debt, newCredit, note)
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

/* Following */

// ListFollowings (ListFollowings)
router.get('/listFollowingUsersById',
    function (req, res, next) {
        const { userId } = req.query;
        if (!userId) {
            const err = new Error('@listFollowingUsersById:Required: userId');
            err.status = 400;
            throw err;
        }
        userRequestModel
            .ListFollowingUsersById(userId)
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
