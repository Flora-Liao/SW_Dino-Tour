// New Archive
router.post(
    '/newArchive/:userid',
    function (req, res, next) {
        //const { userId } = req.params;
        const { userId, scheduleId } = req.body;
        if (!userId || !scheduleId) {
            const err = new Error('@newArchive:Required: userId, scheduleId');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .NewArchive(userId, scheduleId)
            .then((result) => {
                res.json(result);
            })
            .catch(next);
    }
);

// Delete Archive
router.post(
    '/deleteArchive/:userid',
    function (req, res, next) {
        //const { userId } = req.params;
        const { userId, scheduleId } = req.body;
        if (!userId || !scheduleId) {
            const err = new Error('@deleteArchive:Required: userId, scheduleId');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .DeleteArchive(userId, scheduleId)
            .then((result) => {
                res.json(result);
            })
            .catch(next);
    }
);





// New Tag
router.post(
    '/newTag/:userid',
    function (req, res, next) {
        //const { userId } = req.params;
        const { userId, scheduleId, tag} = req.body;
        if (!userId || !scheduleId || !tag) {
            const err = new Error('@newTag:Required: userId, scheduleId, tag');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .NewTag(userId, scheduleId, tag)
            .then((result) => {
                res.json(result);
            })
            .catch(next);
    }
);

// Delete Tag
router.post(
    '/deleteTag/:userid',
    function (req, res, next) {
        //const { userId } = req.params;
        const { tagId } = req.body;
        if (!tagId) {
            const err = new Error('@deleteTag:Required: tagId');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .DeleteTag(tagId)
            .then((result) => {
                res.json(result);
            })
            .catch(next);
    }
);

// New Vote
router.post(
    '/newVote/:userid',
    function (req, res, next) {
        //const { userId } = req.params;
        const { userId, scheduleId, vote } = req.body;
        if (!userId || !scheduleId || !vote) {
            const err = new Error('@newVote:Required: userId, scheduleId, vote');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .NewVote(userId, scheduleId, vote)
            .then((result) => {
                res.json(result);
            })
            .catch(next);
    }
);

// Delete Vote
router.post(
    '/deleteVote/:userid',
    function (req, res, next) {
        //const { userId } = req.params;
        const { userId, scheduleId, vote } = req.body;
        if (!userId || !scheduleId || !vote) {
            const err = new Error('@deleteVote:Required: userId, scheduleId, vote');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .DeleteVote(userId, scheduleId, vote)
            .then((result) => {
                res.json(result);
            })
            .catch(next);
    }
);

// Delete Events On Day
router.post(
    '/deleteEventsOnDay/:userid',
    function (req, res, next) {
        //const { userId } = req.params;
        const { userId, scheduleId, onDay } = req.body;
        if (!userId || !scheduleId || !onDay) {
            const err = new Error('@deleteEventsOnDay:Required: userId, scheduleId, onDay');
            err.status = 400;
            throw err;
        }
        scheduleModifyModel
            .DeleteEventsOnDay(userId, scheduleId, onDay)
            .then((result) => {
                res.json(result);
            })
            .catch(next);
    }
);

// ! WOULD NOT BE USED
// List Owned Schedules
router.get('/listOwnedSchedules', function (req, res, next) {
    const { userid } = req.query;
    if (!userid) {
        const err = new Error('@listOwnedSchedules:Required: userid');
        err.status = 400;
        throw err;
    }
    scheduleRequestModel
        .ListOwnedSchedules(userid)
        .then((result) => {
            res.json(result);
        })
        .catch(next);
});