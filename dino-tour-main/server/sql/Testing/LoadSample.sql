DO $$
DECLARE
    yjuId INT;
    aftermathId INT;
    tangId INT;
    lwsId INT;
    wenId INT;
    chifunId INT;
    trash INT;
    scheduleId INT[10];
BEGIN

yjuId = (SELECT NewUser('yju', 'yju', 'yjuPassword'));
trash = (SELECT UpdateUserDescription(yjuId, 'I''m Yju'));
trash = (SELECT UpdateUserPhoto(yjuId, 'yjuPhoto'));

aftermathId = (SELECT NewUser('aftermath', 'aftermath', 'aftermathPassword'));
trash = (SELECT UpdateUserDescription(aftermathId, 'I''m Aftermath'));
trash = (SELECT UpdateUserPhoto(aftermathId, 'aftermathPhoto'));

tangId = (SELECT NewUser('tang', 'tang', 'tangPassword'));
trash = (SELECT UpdateUserDescription(tangId, 'I''m Tang'));
trash = (SELECT UpdateUserPhoto(tangId, 'tangPhoto'));

lwsId = (SELECT NewUser('lws', 'lws', 'lwsPassword'));
trash = (SELECT UpdateUserDescription(lwsId, 'I''m Lws'));
trash = (SELECT UpdateUserPhoto(lwsId, 'lwsPhoto'));

wenId = (SELECT NewUser('wen', 'wen', 'wenPassword'));
trash = (SELECT UpdateUserDescription(wenId, 'I''m Wen'));
trash = (SELECT UpdateUserPhoto(wenId, 'wenPhoto'));

chifunId = (SELECT NewUser('chifun', 'chifun', 'chifunPassword'));
trash = (SELECT UpdateUserDescription(chifunId, 'I''m Chifun'));
trash = (SELECT UpdateUserPhoto(chifunId, 'chifunPhoto'));

FOR i IN 1..5
LOOP
    scheduleId[i] = (SELECT NewSchedule(yjuId, FORMAT('Schedule %s', i), '2023-06-30', '2023-08-31', TRUE, TRUE, 1000, 'aftermath,yju,tang,lws,wen,chifun'));
END LOOP;

FOR i in 6..10
LOOP
    scheduleId[i] = (SELECT NewSchedule(aftermathId, FORMAT('Schedule %s', i), '2023-06-30', '2023-08-31', TRUE, TRUE, 1000, 'aftermath,yju'));
END LOOP;

trash = (SELECT ToggleArchive(yjuId, scheduleId[1]));
trash = (SELECT ToggleArchive(aftermathId, scheduleId[1]));
trash = (SELECT ToggleVote(tangId, scheduleId[1], 'Economic'));
trash = (SELECT ToggleVote(wenId, scheduleId[1], 'Economic'));
trash = (SELECT ToggleVote(chifunId, scheduleId[1], 'Delicious'));
trash = (SELECT ToggleVote(wenId, scheduleId[1], 'Popular'));

trash = (SELECT ToggleFollowing(yjuId, 'aftermath'));
trash = (SELECT ToggleFollowing(tangId, 'aftermath'));
trash = (SELECT ToggleFollowing(lwsId, 'wen'));
trash = (SELECT ToggleFollowing(aftermathId, 'yju'));

trash = (SELECT NewCredit(scheduleId[1], aftermathId, 600, 'I''m hungry', 'yju,tang,lws,aftermath,wen,chifun'));
trash = (SELECT NewNote(aftermathId, scheduleId[1], 'Become the first one to reply', 'yellow'));

trash = (SELECT NewEvent(aftermathId, scheduleId[1], 1, 1, '02:00:00', 'sleeping', 'sleeping photo', 'how many beds do we need?', 'walking'));
trash = (SELECT NewEvent(yjuId, scheduleId[1], 1, 2, '01:00:00', 'wake up', 'wake up photo', 'blablabla', 'walk'));
trash = (SELECT NewEvent(tangId, scheduleId[1], 2, 1, '01:00:00', 'wake up', 'wake up photo', 'blablabla', 'walk'));
trash = (SELECT NewEvent(lwsId, scheduleId[1], 1, 3, '01:00:00', 'wake up', 'wake up photo', 'blablabla', 'motorcycle'));


END $$;
;
/*
Test Requests
*/

