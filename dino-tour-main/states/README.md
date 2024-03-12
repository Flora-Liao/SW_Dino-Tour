# States
> Most of the function parameters are not settled, so as the return value.

## TODOS
- [ ] set default cover of initial state in `scheduleInfo-reducers.js`
- [ ] ranking-reducers, explore-reducers, scheduleInfo-reducers, ledgerList-reducers, credit, ledger dir
- [ ] delete a schedule

## Issues
- The changing password page is not specify in Figma. What actions should be used for this page?
- Discuss how to deal with images. The images would be convert to binary and store in database.
- The fork page seems to lack the create ledger option.
- Discuss whether the fork can be perform only once.
- Issue in gitlab, about deleted member.(delete the member and all of its ledger)
- How does the "delete day" action actually work?(clear all events in that day)
- Store once the button press?(overwrite)
- How to reach the destination.(ignore?)
- How to divide the ledger if there is floating point.(member who pays pay more)

## Documentation for Actions
Listed by file structure. 

The functions with (db) means they would get or modify the data in the database.

The functions with (api) means they would get the data using google map API.

Each function (for example, with name `functionName`) with (db) or (api) would communicate with the database/goolge map, via API. The function would also follow a function `endFunctionName`, which will be called by `functionName`, and returns the needed data after `functionName` finishes the API call.

How it works isn't important. Just remember don't use any function with name `endFunctionName`.

For the usage of the actions, please refer to `redux-hooks-weathermood-post`.

---

### Explore
Contains actions for explore page and ranking page. The actions for browsing other's schedule are also places here.

#### explore
- `listExplore`(db): list the tour that contains the `searchtext` and sorted by `key`(Economic/Popular/Delicious).
- `setSearchText`: setting the entered search text in the search bar.

#### ranking
- `listRanking`(db): list the top 10th users, sorted by `key`(Economic/Popular/Delicious).

#### publicSchedule
Handles the public data of the schedules(when clicking into the schedules).

PUBLICSCHEDULE handles the information of the main page (the page that examines the journey).

PUBLICSCHEDULEINFO handles the information page of a schedule.

SPOTINFO handles the information for every single spot.

- PUBLICSCHEDULE
    - `getSchedule`(db): get all information of a schedule in the main page. Including is in the collection or not, the name of the schedule, the whole schedule content ... etc.
    - `setScheduleContent`: set a schedule's to the kth day and show its content. The day should be one of the input parameter.
    - `toggleLikeSchedule`(db): handles the action that users like or unlike a schedule. Which button is pressed (Economic/Popular/Delicious) should be specify. If the user has liked the schedule, this action set it to unlike and decrease the schedule's likes by 1, and vice versa.
    - `toggleCollection`(db): Handles whether the user keep this schedule in collection. If the button is pressed with the user has not keep the collection, put the schedule into collection and vice versa. This action also modifies the user's collection list.
- PUBLICSCHEDULEINFO
    - `getScheduleInfo`(db): get the data in the schedule's information page.
- SPOTINFO
    - `getSpotInfo`(db): get the data in the spot's information page. 

---

### Ledger
Contains actions related to the ledger.

#### ledgerList
The list of all ledgers.

- `listLedger`(db): list all ledgers.

#### credit
Handle all credits for a single ledger.

CREDITLIST handles the whole list.

CREDITFORM handles the create form of a new credit.

- CREDITLIST
    - `listCredit`(db): list all credit.
- CREDITFORM
    - `getCreditForm`(db): get the necessary information to display the credit form, including member list and ledger name.
    - `addCredit`(db): add a new credit using the information from the input form.
    - `setCreditName`: set the name of the credit.
    - `setCreditValue`: set the amount of money.
    - `setCreditPayer`: specify who pays for this credit.
    - `setCreditDebtor`: specify who owes the payer. Toggle used. (Should past one debtor at a time)

#### arrear
Handle the relation between the payer and the debtor.

- `getLedgerGeneralInfo`(db): get ledger name and members for the ledger, including images, username and account.
- `setCurrentAccount`: set the current examining member.
- `listPayment`(db): list all unpaid credit for a single member (the member owes others).
- `listRecover`(db): list all unrecovered credit for a single member (others owe the member).
- `markRecoverCredit`: mark a single credit as to be deleted (i.e. mark with a white dot). The mark should only be trigger when the user examines their own unrecovered credit.
- `deleteRecoverCredit`(db): delete all marked unrecovered credit.

---

### Schedule
Contains actions related to user's personal schedules.

#### schedule
SCHEDULELIST handles the actions for the list of 'my schedule'.

SCHEDULE handles the actions for the schedule object.

- SCHEDULELIST
    - `listMySchedule`(db): list all 'my schedule'.
- SCHEDULE
    - `createSchedule`(db): create a new schedule and put it into the schedule list. There should be input parameters to specify the information of the schedule. 
    
        The information of the schedule that are not specified by the user should also be provided (default value needed). For example, the cover image should be the default image, rather than 'NaN'.

        The ledger of this schedule will also be created after this function is called.

#### scheduleContent
Handle the content of the journey.

VIEWMODE handles the action for view mode.

EDITMODE handles the action for edit mode.

- VIEWMODE
    - `getContent`(db): get all journey content of a schedule, including all days.
    - `updateContent`(db): update the content from edit mode to the database.
- EDITMODE
    - `setStartTime`: set the start time of a day. The day should be specified as input parameter.
    - `addSpot`: add a new spot. The input parameter should contain a spot object.
    - `deleteSpot`: delete an exist spot.
    - `updateSpot`: update the spot using a spot object.
    - `clearDay`: once the "delete day" button is pressed, clear all event in that day.

#### spot
Handle a single spot of the journey.

SPOT handles the action for spot editing and creating page.

SPOTSEARCHBAR handles the search bar for creating a new spot.

SPOTSEARCH handles the actions related to search spot results.

- SPOT
    - `setSpend`: set the estimate cost of the spot. userID should be specified.
    - `setTimeHour`: set the time (hour) for the spot.
    - `setTimeMin`: set the time (min) for the spot.
    - `setSpotBasic`: set the basic information of the spot, i.e. the spot name and its image.
- SPOTSEARCHBAR
    - `setSearchSpot`: set the input content for the search bar.
- SPOTSEARCH
    - `getSearchResult`(api): get the search results using input content from the search bar.

#### scheduleInfo
The actions here handle the information page of the schedule.

- `getScheduleInfo`(db): get the information of the schedule.
- `deleteSchedule`(db): delete the schedule and all relative data.
- `updateScheduleInfo`(db): update the information of the schedule. This function should be called once the user press the save button. Necessary parameters should all be passed in to update the database. This part of update including schedule name, start date, end date, is public.
- `updateScheduleIntro`(db): update the introduction of the schedule to the database.
- `updateScheduleImage`(db): update the cover image of the schedule to the database.
- `updateScheduleBudget`(db): update the user's budget of the schedule to the database.
- `addMember`(db): add a new member to the schedule. Note this action is async with the save button.
- `deleteMember`(db): delete an existing member in the schedule. Note this action is async with the save button.
- `addTag`(db): add a new tag to the schedule. Note this action is async with the save button.
- `deleteTag`(db): delete an existing tag in the schedule. Note this action is async with the save button.
- `setScheduleName`: set the name of the schedule.
- `setStartDate`: set the start date.
- `setEndDate`: set the end date.
- `togglePublic`: set `public` to false if it is true originally. Otherwise, set it to true.
- `setIntro`: set the introduction and the tags of the schedule. The input should be the content return by the scheduleIntro page.
- `changeCoverImage`: set the cover image.
- `setPersonalBudget`: set personal budget.
- `addMember`: add a member to this schedule.
- `deleteMember`: delete a member from this schedule.

#### memberSearch
Handle the action in search member page.

- `setSearchId`: set the input text in the search bar.
- `searchUser`(db): search the user by search text. A list contains users would be returned.

#### scheduleIntro
The actions here handle the page that set the introduction and add tag.

SCHEDULEINTRO handles the content of introduction and tags.

TAGTEXT handles the input bar for adding a new tag.

- SCHEDULEINTRO
    - `setIntro`: set the input text of the introduction input block.
    - `addTag`(db): add a new tag to the tag list. The new tag's content is from the input bar.
    - `deleteTag`(db): delete a tag currently in the tag list.
- TAGTEXT
    - `setInputTag`: set the input text of the bar for adding a new tag.

#### note
The actions here handle the note page for every schedule.

- `listNotes`(db): list all notes for a schedule.
- `createNewNote`(db): add the new note to the database.
- `deleteNote`(db): delete the note from the database.

---

### Users
Contains actions related to users.

#### user
Handle actions of a user's public information.

- `getUserInfo`(db): get all information of a user page.
- `toggleFollows`(db): let the current user follow/unfollow the user he is examining.

#### setting
There are 3 types of action: PROFILE / NOTIFICATION / FOLLOWING, classify by the 3 different pages in UI. The action of PROFILE are divided into more small types, also classified by the page.

- PROFILEPERSONAL
    - `getSettingProfile`(db): get the overall information of the profile page.
- PROFILEMAIN
    - `getUserNameAndAccount`(db): get the user's username and user account.
    - `changeAvatar`(db): change the user's avatar.
    - `changeBackgroundImage`(db): change the user's background image.
- PROFILENAME
    - `setTempName`: setting the entered name in the name form.
    - `changeName`(db): change the user's name to the input from the name form. 
- PROFILEINTRO
    - `setTempIntro`: setting the entered introduction in the introduction form.
    - `editIntro`(db): change the user's intro to the input from the introduction form.
- PROFILEPASSWORD
    - `inputOldPassword`: setting the entered old password in the form.
    - `inputNewPassword`: setting the entered new password in the form.
    - `verifyPassword`(db): input the old password. Returns a boolean value specify whether the password is matched.
    - `changePassword`(db): input the new password. Change user's password in the database.
- NOTIFICATION
    - `getNotificationInfo`(db): get the value of the 6 notification switches. The order of the data is according to the order in notification page, from top to bottom(Push, Invitation, Dun, Arrear, New Payment, Note).
    - `toggleNotification`: given the index, toggle the corresponding value (setting true to false, false to true). The index is 0-based and follow the above order.
    - `updateNotification`(db): once the user press the go back button, update the current notification state to the database. 
- FOLLOWING
    - `ListFollowings`(db): list all followings of the user.

#### collection
Handle the collection page.

- `listCollection`(db): list the collection list of the user.

#### account
Handle actions about account ID and password.

ACCOUNT handles delete account.

LOGIN handles the login page.

SIGNUP handles the sign up page.

- ACCOUNT
    - `deleteAccount`(db): delete an account with given userID.
- LOGIN
    - `login`(db): attempt login with given userID and password. Return the user's ID in the database, for the purpose of getting data from the database. If failed, the return value would be negative. -1 means account not found and -2 means wrong password.
    - `setLoginAccount`: set the entered account ID in the form.
    - `setLoginPassword`: set the entered password in the form.
- SIGNUP
    - `createAccount`(db): create a new account with given account, password and username. Will ensure whether the account is unique, if not, return -1, otherwise return a positive number specify the userID.
    - `setNewAccount`: set the entered new account ID in the form.
    - `setNewPassword`: set the entered new password in the form.
    - `setNewUsername`: set the entered new username in the form.
