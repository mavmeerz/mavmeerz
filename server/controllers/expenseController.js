"use strict"
const Expense = require('../models/expense.js')
const subCategoryController = require('./subCategoryController.js')

/**
  This function will add individual expenses.
*/
exports.addExpense = (csvId, description, amount, category, callback) => {
  new Expense({csvId: csvId, description: description, amount: amount, category: category}).save().then(callback);
};

/**
  This function will take an array of expense data objects and then add
  each expense to the database.
*/

//expense.Date needs to be formatted properly
exports.addAllExpenses = (accountId, expenseDataArr,fileId,userId) => {
  return new Promise((resolve, reject) => {
    // console.log('expense data array lowercased ?', expenseDataArr[0]);

    subCategoryController.getSubCategoryId('Other').then((id) => {
      expenseDataArr.forEach((expense) => {

        let inDate = {
          year: expense['date'].match(/\d+/g)[2],
          month: expense['date'].match(/\d+/g)[0],
          day: expense['date'].match(/\d+/g)[1]
        }

        //Currently random assigning categories to each expense
        // expense.categoryId = Math.floor(Math.random()*46)
        // expense.categoryId=1
        new Expense({accountId: accountId, description: expense.description, amount: expense.amount, categoryId: id, statementId: fileId, userId: userId, date: `${inDate.year}-${inDate.month}-${inDate.day}`}).save();
      });
      resolve('success');
    });
  });
};

// const dateFormatter = (date) => {
//
//
//
// }

/**
  This function will take in a user id input and then return an array
  of 'models' which will be an array of expense data objects for the
  specific input user
*/
exports.getExpenses = (user) => {
  return new Promise((resolve,reject) => {
    new Expense().query("where", "userId", "=", user.id).fetchAll().then((data) => {
      resolve(data.models)
    });
  });
};

/**
  This function will return a Promise which will have access to data.models,
  which is an array expense data objects
*/
exports.getAllExpenses = () => {
  return new Promise((resolve,reject) => {
    new Expense().fetchAll().then((data) => {
      resolve(data.models)
    });
  });
};

exports.updateExpenseCategory = (expenseId, category) => {
  return new Promise((resolve, reject) => {
    subCategoryController.getSubCategoryId(category).then((categoryId) => {
      new Expense({id: expenseId}).fetch()
        .then(expense => expense.set({categoryId: categoryId}).save())
        .then(expense => resolve(expense));
    });
  });
}
