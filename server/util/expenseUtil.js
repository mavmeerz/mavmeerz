"use strict"
const fs  = require('fs');
const csv = require('csv');
const testCSV = __dirname + '/../test.csv';
const expenseController = require('../controllers/expenseController.js');
const CSVController     = require('../controllers/csvFileController.js');
// const categoryController = require('../controllers/categoryController.js');
const subCategoryUtil      = require('./subCategoryUtil.js');
const accountUtil          = require('./accountUtil.js');
const         _            = require('lodash');


function addExpensesToDB(accountId, expenses, userId) {
    // CSVController.addFile is here because it is required to
    // link a foreign id to the expense table. The CSV table will
    // eventually be replaced by a user table

  return new Promise((resolve, reject) => {
    expenses = processExpenses(expenses);
    CSVController.addFile('expenses',userId)
      .then((fileId) => {
        return expenseController.addAllExpenses(accountId, expenses, fileId, userId);
      })
      .then(() => {
        resolve('success');
      })
      .catch((err) => console.log('error in addAllExpenses', err));
  });
}

// takes expenses from MySQL db, puts them into an array of objects,
// and adds category name instead of category id
function getExpensesFromDB(user) {
  return new Promise((resolve, reject) => {
    let results = [];
    expenseController.getExpenses(user)
      .then((expenses) => {
        expenses.forEach((expense) => {
          results.push(expense.attributes);
        });
        return results;
      })
      .then((results) => {
        return subCategoryUtil.replaceSubCategoryIDWithName(results)
      })
      .then(expenses => {
        return accountUtil.replaceAccountIDWithName(expenses);
      })
      .then((expenses) => {
        // sort expenses by ID
        resolve(_.sortBy(expenses, expense => expense.id));
      });
  });
}

// takes an expenseId and a category,
// updates the database entry with the category,
// and sends it into a callback if successful
function updateExpenseCategoryinDB(expenseId, category) {
  // expenseController.updateExpenseCategory(expenseId, category, (success) => {
  //   if (success) callback(success);
  // });
  return new Promise((resolve, reject) => {
    expenseController.updateExpenseCategory(expenseId, category)
      .then(success => resolve(success));
  })

}

function bulkUpdateExpenseCategoriesinDB(expenses, category) {
  return new Promise((resolve, reject) => {
    expenses.forEach((id) => {
      expenseController.updateExpenseCategory(id, category);
    });
    resolve('success');
  });
}


/////////////////////// HELPERS //////////////////////////////


// this makes sure every heading is lowercased regardless
// of the CSV it is coming from
function processExpenses(expenses) {
  lowerCaseExpensesHeaders(expenses);
  matchAllHeaders(expenses);
  makeExpensesPositive(expenses);
  expenses = filterOutDeposits(expenses);
  return expenses;
}

function filterOutDeposits(expenses) {
  let results = expenses.filter(expense => Number(expense.amount) > 0);
  expenses = results;
  return results;
}

function makeExpensesPositive(expenses) {
  let negatives = expenses.reduce((total, expense) => {
    return Number(expense.amount) < 0 ? total + 1 : total;
  }, 0);
  if (negatives !== 0 && (expenses.length / negatives) > 0.5) {
    expenses.forEach((expense) => {
      expense.amount = Number(expense.amount) * -1;
    });
  }
}

function lowerCaseExpensesHeaders(expenses) {
  expenses.forEach(expense => lowerCaseKeys(expense));
}

function matchAllHeaders(expenses) {
  expenses.forEach(expense => matchHeaders(expense));
}

function matchHeaders(expense) {
  // anything that has 'cost' or 'amount' should be changed to 'amount'
  matchCostHeader(expense);
  matchDateHeader(expense);
  // matchDescriptionHeader(expenses);
}


//TO-DO combine matchDateHeader and matchCostHeader functions into one
function matchDateHeader(expense) {
 for (let key in expense) {
   if (key.match(/date/i)) {
     expense['date'] = expense[key];
   }
 }
}

function matchCostHeader(expense) {
  for (let key in expense) {
    if (key.match(/cost/i) || key.match(/amount/i) || key.match(/debit/i)) {
      expense['amount'] = expense[key];
    }
  }
}

function lowerCaseKeys(object) {
  for (let key in object) {
    lowerCaseKey(object, key);
  }
}

function lowerCaseKey(object, key) {
  object[key.toLowerCase()] = object[key];
};

module.exports = { addExpensesToDB: addExpensesToDB,
                   getExpensesFromDB: getExpensesFromDB,
                   updateExpenseCategoryinDB: updateExpenseCategoryinDB,
                   bulkUpdateExpenseCategoriesinDB: bulkUpdateExpenseCategoriesinDB,
                   processExpenses: processExpenses };
