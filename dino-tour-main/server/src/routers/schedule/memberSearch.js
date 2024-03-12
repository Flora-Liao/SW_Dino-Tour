const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../../middleware/access-controller.js');

const userRequestModel = require('../../model/request/user.js');

const router = express.Router();

router.use(express.json());
router.use(accessController); // Allows cross-origin HTTP requests

const awaitObjectWithPromise = require('../utilities.js');

// List Users By Account (searchUser)
router.get('/listUsersByAccount', function (req, res, next) {
    const { searchText } = req.query;
    if (searchText == null) {
        const err = new Error('@listUsersByAccount:Required: searchText');
        err.status = 400;
        throw err;
    }
    userRequestModel
        .ListUsersByAccount(searchText)
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