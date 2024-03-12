require('../config.js');
const express = require('express');

const exploreRouter = require('./routers/explore/explore.js');

const arrearRouter = require('./routers/ledger/arrear.js');
const creditRouter = require('./routers/ledger/credit.js');
const ledgerListRouter = require('./routers/ledger/ledgerList.js');

const memberSearchRouter = require('./routers/schedule/memberSearch.js');
const noteRouter = require('./routers/schedule/note.js');
const scheduleRouter = require('./routers/schedule/schedule.js');
const scheduleInfoRouter = require('./routers/schedule/scheduleInfo.js');
const scheduleContentRouter = require('./routers/schedule/scheduleContent.js');

const accountRouter = require('./routers/user/account.js');
const collectionRouter = require('./routers/user/collection.js');
const settingRouter = require('./routers/user/setting.js');
const userRouter = require('./routers/user/user.js');

const rootRouter = express.Router();
rootRouter.use('/explore',exploreRouter);

rootRouter.use('/arrear', arrearRouter);
rootRouter.use('/credit', creditRouter);
rootRouter.use('/ledgerList', ledgerListRouter);

rootRouter.use('/memberSearch', memberSearchRouter);
rootRouter.use('/note', noteRouter);
rootRouter.use('/schedule', scheduleRouter);
rootRouter.use('/scheduleInfo', scheduleInfoRouter);
rootRouter.use('/scheduleContent', scheduleContentRouter);

rootRouter.use('/account', accountRouter);
rootRouter.use('/collection', collectionRouter);
rootRouter.use('/setting', settingRouter);
rootRouter.use('/user', userRouter);

// const requestLogger = require('./middleware/request-logger.js');
const errorHandler = require('./middleware/error-handler.js');

const app = express();

app.use('/', rootRouter);
app.use(errorHandler);


// !
// app.use(requestLogger); // debug only
// app.use(express.static('dist', {
//     setHeaders: (res, path, stat) => {
//         res.set('Cache-Control', 'public, s-maxage=86400');
//     }
// }));
// app.use('/api', postRouter);
// app.use('/api', todoRouter);
// app.get('/*', (req, res) => res.redirect('/'));

const port = 3000;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}...`);
});
