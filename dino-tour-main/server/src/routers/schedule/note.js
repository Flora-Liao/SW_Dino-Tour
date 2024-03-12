const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../../middleware/access-controller.js');

const scheduleRequestModel = require('../../model/request/schedule.js');
const scheduleModifyModel = require('../../model/modify/schedule.js');

const router = express.Router();

router.use(express.json());
router.use(accessController); // Allows cross-origin HTTP requests

const awaitObjectWithPromise = require('../utilities.js');

// List Notes (listNotes)
router.get('/listNotes', function (req, res, next) {
    const { scheduleId } = req.query;
    if (!scheduleId) {
        const err = new Error('@listNotes:Required: scheduleId');
        err.status = 400;
        throw err;
    }
    scheduleRequestModel
        .ListNotes(scheduleId)
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

// New Note (createNewNote)
router.post(
    '/newNote',
    function (req, res, next) {
        const { userId, scheduleId, content, colour } = req.body;
        if (!userId || !scheduleId || content == null || colour == null) {
            const err = new Error('@newNote:Required: userId, scheduleId, content, colour');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .NewNote(userId, scheduleId, content, colour)
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

// Delete Note (deleteNote)
router.post(
    '/deleteNote',
    function (req, res, next) {
        const { noteId } = req.body;
        if (!noteId) {
            const err = new Error('@deleteNote:Required: noteId');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .DeleteNote(noteId)
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

// ! Would not be used
// Update Note
router.post(
    '/ueleteNote',
    function (req, res, next) {
        const { noteId, content, colour} = req.body;
        if (!noteId || !content || !colour) {
            const err = new Error('@ueleteNote:Required: noteId, content, colour');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .UpdateNote(noteId, content, colour)
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