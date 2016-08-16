"use strict"
const accountController = require('../controllers/accountController.js');

function getAccountID(userId, account) {
  return new Promise((resolve, reject) => {
    addAccountIfNotExists(userId, account)
      .then((account) => {
        resolve(account.get('id'));
      });
  })
}

function replaceAccountIDWithName(expenses) {
  return new Promise((resolve, reject) => {
    let results = [];
    let promises = [];

    for (let i = 0; i < expenses.length; i++) {
      promises.push(accountController.getAccountNameFromId(expenses[i].accountId)
        .then((accountName) => {
          expenses[i].account = accountName;
          results.push(expenses[i]);
        }));
    }

    Promise.all(promises).then(() => resolve(results));
    });
}

function addAccountIfNotExists(userId, accountName)  {
  return new Promise((resolve, reject) => {
    accountExists(userId, accountName)
      .then((account) => {
        // create account
        if (!account) {
          addAccountToDB(userId, accountName)
            .then((account) => {
              //retrieve userID
              resolve(account);
            });
        }
        else resolve(account);
      });
  });
}

function addAccountToDB(userId, account) {
  return new Promise((resolve, reject) => {
    let accountInfo = {name: account, userId: userId};
    accountController.addAccount(accountInfo).then((account) => {
      resolve(account);
    });
  });
}

function accountExists(userId, account) {
  return new Promise((resolve, reject) => {
    let accountInfo = {name: account, userId: userId};
    accountController.retrieveAccount(accountInfo)
      .then((foundAccount) => {
        resolve(foundAccount);
      });
  });
}

module.exports = {
  addAccountToDB: addAccountToDB,
  accountExists: accountExists,
  getAccountID: getAccountID,
  replaceAccountIDWithName: replaceAccountIDWithName
};
