require('../config.js');
ModifyUserModel = require('../src/model/modify/user.js');
ModifyMemberModel = require('../src/model/modify/member.js');
ModifyScheduleModel = require('../src/model/modify/schedule.js');
ModifyFollowingModel = require('../src/model/modify/following.js');
ModifyTagModel = require('../src/model/modify/tag.js');
ModifySettingModel = require('../src/model/modify/setting.js');
ModifyCreditModel = require('../src/model/modify/credit.js');

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

/*
ModifyMemberModel.NewMember(4, 'tang', 3, 0).then(data => {
    ModifyMemberModel.UpdateMember(5, 3, 1000);
});
*/

ModifyScheduleModel.UpdateScheduleDescription(5, 3, 'so tired');

ModifyScheduleModel.UpdateScheduleImage(5, 3, 'my photo');

ModifyScheduleModel.NewArchive(5, 3).then(
    data => {
        console.log(data);
        ModifyScheduleModel.DeleteArchive(5, 3);
    }
);

ModifyScheduleModel.NewNote(5, 3, 'Hahaha', 'red').then(
    data => {
        console.log(data);
        ModifyScheduleModel.UpdateNote(data.newnote, 'so sad', 'yellow').then(
            data => {
                console.log(data);
                ModifyScheduleModel.DeleteNote(data.updatenote);
            }
        );
    }
)

