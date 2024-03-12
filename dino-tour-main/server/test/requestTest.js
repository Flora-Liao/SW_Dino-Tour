require('../config.js');
RequestUserModel = require('../src/model/request/user.js');
RequestMemberModel = require('../src/model/request/member.js');
RequestScheduleModel = require('../src/model/request/schedule.js');
RequestTagModel = require('../src/model/request/tag.js');
RequestSettingModel = require('../src/model/request/setting.js');
RequestCreditModel = require('../src/model/request/credit.js');

if (!global.db) {
    const cn = {
        host: 'localhost',
        port: 5432,
        database: 'dino',
        user: 'postgres',
        password: 'postgres',
        max: 30 // use up to 30 connections
    
        // "types" - in case you want to set custom type parsers on the pool level
    };
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

RequestScheduleModel.ListOwnedSchedules(4).then(
    data => {
        for (i of data)
            i.then(obj => {
                console.log(obj);
            })
    }
)
