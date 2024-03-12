import { simulateServerFlag as flag } from '../utility.js';
import {
    getSettingProfile as getSettingProfileApi,
    changeName as changeNameApi,
    editIntro as editIntroApi,
    changeAvatar as changeAvatarApi,
    changeBackgroundImage as changeBackgroundImageApi,
    getNotificationInfo as getNotificationInfoApi,
    updateNotification as updateNotificationApi,
    ListFollowings as ListFollowingsApi,
} from '../../api/users/setting.js';

/* My profile - view personal profile (???) */

const randomProfile = {
    // Add casual data
    userid: 1,
    useraccount: 'yju',
    username: 'yju',
    userdescription: 'I\'m Yju',
    // userbackgroundimage: ,
    // userphoto: "yjuPhoto",
    numoffollowings: 1,
    numoffollowers: 1,
    numofschedulearchived: 2,
    numofpublicschedules: 3,
    isfollowing: false,
    isme: true,
    listofownedschedules: [
        {
            scheduleid: 1,
            schedulename: 'Schedule 1',
            scheduledescription: '',
            startdate: '2023-06-29T16:00:00.000Z',
            // scheduleimage: "",
            author: 'yju',
            vote_e: 2,
            vote_d: 1,
            vote_p: 1,
            authorinfo: {
                useraccount: 'yju',
                username: 'yju',
                // userphoto: "yjuPhoto"
            }
        },
        {
            scheduleid: 2,
            schedulename: 'Schedule 2',
            scheduledescription: '',
            startdate: '2023-06-19T16:00:00.000Z',
            // scheduleimage: "",
            author: 'yju',
            vote_e: 4,
            vote_d: 5,
            vote_p: 6,
            authorinfo: {
                useraccount: 'yju',
                username: 'yju',
                // userphoto: "yjuPhoto"
            }
        },
        {
            scheduleid: 3,
            schedulename: 'Schedule 3',
            scheduledescription: '',
            startdate: '2023-05-29T16:00:00.000Z',
            // scheduleimage: "",
            author: 'yju',
            vote_e: 1,
            vote_d: 3,
            vote_p: 4,
            authorinfo: {
                useraccount: 'yju',
                username: 'yju',
                // userphoto: "yjuPhoto"
            }
        },
    ]
};

export function getSettingProfile() {
    if (flag) {
        return endGetSettingProfile(randomProfile);
    } else {
        // TODO
    }
}

function endGetSettingProfile(profile) {
    return {
        type: '@PROFILEPERSONAL/END_GET_PROFILE',
        profile: profile,
    };
}

/* My profile - main (MyProfile.jsx) */

// get name and account
export function getUserNameAndAccount() {
    if (flag) {
        return endGetUserNameAndAccount('brannie', 'branniesocute');
    } else {
        // TODO
    }
}

function endGetUserNameAndAccount(username, account) {
    return {
        type: '@PROFILEMAIN/END_GET_PROFILE',
        username: username,
        account: account,
    };
}

// Avatar
export function changeAvatar(img) {
    if (flag) {
        return endChangeAvatar(img);
    } else {
        // TODO
    }
}

function endChangeAvatar(img) {
    return {
        type: '@PROFILEMAIN/END_CHANGE_AVATAR',
        img: img,
    };
}

// Background Image
export function changeBackgroundImage(img) {
    if (flag) {
        return endChangeBackgroundImage(img);
    } else {
        // TODO
    }
}

function endChangeBackgroundImage(img) {
    return {
        type: '@PROFILEMAIN/END_CHANGE_BACKIMAGE',
        img: img,
    };
}

/* My profile - name (Editname.jsx) */

// Name
export function setTempName(name) {
    return {
        type: '@PROFILENAME/SET_TEMP_NAME',
        name: name,
    };
}

export function changeName(userId, username, password) {
    if (flag) {
        return endChangeName();
    } else {
        // TODO: api would also change the password
        return (dispatch, getState) => {
            return changeNameApi(userId, text).then(p => {
                dispatch(endChangeName());
            }).catch(err => {
                console.error('Error update intro', err);
            });
        };
    }
}

function endChangeName() {
    return {
        type: '@PROFILENAME/END_CHANGE_NAME',
    };
}

/* My profile - intro (Editintro.jsx) */

// Intro
export function setTempIntro(text) {
    return {
        type: '@PROFILEINTRO/SET_TEMP_INTRO',
        text: text,
    };
}

export function editIntro(userId, text) {
    if (flag) {
        return endEditIntro();
    } else {
        return (dispatch, getState) => {
            return editIntroApi(userId, text).then(p => {
                dispatch(endEditIntro());
            }).catch(err => {
                console.error('Error update intro', err);
            });
        };
    }
}

function endEditIntro() {
    return {
        type: '@PROFILEINTRO/END_EDIT_INTRO',
    };
}

/* My profile - password (Editpassword.jsx) */

// password
export function inputOldPassword(password) {
    return {
        type: '@PROFILEPASSWORD/INPUT_OLD_PASSWORD',
        password: password,
    };
}

export function inputNewPassword(password) {
    return {
        type: '@PROFILEPASSWORD/INPUT_NEW_PASSWORD',
        password: password,
    };
}

export function verifyPassword(oldpassword) {
    if (flag) {
        return endVerifyPassword(true);
    } else {
        // TODO
    }
}

function endVerifyPassword(iscorrect) {
    return {
        type: '@PROFILEPASSWORD/END_VERIFY_PASSWORD',
        iscorrect: iscorrect,
    };
}

export function changePassword(newpassword) {
    if (flag) {
        return endChangePassword();
    } else {
        // TODO
    }
}

function endChangePassword() {
    return {
        type: '@PROFILEPASSWORD/END_CHANGE_PASSWORD'
    };
}

/* Notification */

const randomNotification = {
    // Add casual data
    general: true,
    invite: false,
    loan: true,
    debt: true,
    newcredit: false,
    note: true,
};

export function getNotificationInfo(userId) {
    if (flag) {
        return endGetNotificationInfo(randomNotification);
    } else {
        return (dispatch, getState) => {
            return getNotificationInfoApi(userId).then(noti => {
                dispatch(endGetNotificationInfo(noti));
            }).catch(err => {
                console.error('Error get notification', err);
            });
        };
    }
}

function endGetNotificationInfo(notification) {
    return {
        type: '@NOTIFICATION/END_GET_INFO',
        notification: notification,
    };
}

export function toggleNotification(idx) {
    return {
        type: '@NOTIFICATION/TOGGLE_NOTIFICATION',
        index: idx,
    };
}

export function updateNotification(userId, general, invitation, loan, debt, newCredit, note) {
    if (flag) {
        return endUpdateNotification();
    } else {
        return (dispatch, getState) => {
            return updateNotificationApi(userId, general, invitation, loan, debt, newCredit, note).then(p => {
                dispatch(endUpdateNotification());
            }).catch(err => {
                console.error('Error get notification', err);
            });
        };
    }
}

function endUpdateNotification() {
    return {
        type: '@NOTIFICATION/END_UPDATE'
    };
}

/* Followings */

const randomFollowings = {
    // Add casual data
};

export function ListFollowings(userId) {
    if (flag) {
        return endListFollowings(randomFollowings);
    } else {
        // TODO
        return (dispatch, getState) => {
            return ListFollowingsApi(userId).then(followings => {
                dispatch(endListFollowings(followings));
            }).catch(err => {
                console.error('Error list followings', err);
            });
        };
    }
}

function endListFollowings(followings) {
    return {
        type: '@FOLLOWING/END_LIST_FOLLOWINGS',
        followings: followings,
    };
}